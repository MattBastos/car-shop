import { Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';

export default class MotorcycleController {
  private _req: Request;
  private _res: Response;
  private _service: MotorcycleService;
  private _motorcycleNotFoundMessage = 'Motorcycle not found';
  private _invalidMongoIdMessage = 'Invalid mongo id';

  constructor(req: Request, res: Response) {
    this._req = req;
    this._res = res;
    this._service = new MotorcycleService();
  }

  public async create() {
    const { body } = this._req;

    const motorcycle: IMotorcycle = {
      model: body.model,
      year: body.year,
      color: body.color,
      status: body.status,
      buyValue: body.buyValue,
      category: body.category,
      engineCapacity: body.engineCapacity,
    };

    const newMotorcycle = await this._service.create(motorcycle);
    return this._res.status(201).json(newMotorcycle);
  }

  public async find() {
    const allMotorcycles = await this._service.find();
    return this._res.status(200).json(allMotorcycles);
  }

  public async findById() {
    const { id } = this._req.params;
    const { message } = await this._service.findById(id);

    if (message === this._motorcycleNotFoundMessage) return this._res.status(404).json({ message });

    if (message === this._invalidMongoIdMessage) return this._res.status(422).json({ message });

    return this._res.status(200).json(message);
  }

  public async findByIdAndUpdate() {
    const { id } = this._req.params;
    const { body } = this._req;
    const { message } = await this._service.findByIdAndUpdate(id, body);
    
    if (message === this._motorcycleNotFoundMessage) return this._res.status(404).json({ message });

    if (message === this._invalidMongoIdMessage) return this._res.status(422).json({ message });

    return this._res.status(200).json(message);
  }

  public async findByIdAndDelete() {
    const { id } = this._req.params;
    const { message } = await this._service.findByIdAndDelete(id);

    if (message === this._motorcycleNotFoundMessage) return this._res.status(404).json({ message });

    return this._res.status(200).json(message);
  }
}
