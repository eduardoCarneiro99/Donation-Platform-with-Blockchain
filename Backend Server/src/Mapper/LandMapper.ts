import { Land } from "../Domain/Land/Land";
import { Lot } from "../Domain/Land/Lot";
import { Description } from "../Domain/Shared/Description";
import { Name } from "../Domain/Shared/Name";
import { LandDTO } from "../DTO/LandDTO";
import { LotDTO } from "../DTO/LotDTO";
import LandModel, { ILandModel } from "../Model/LandModel";
import { ILotModel } from "../Model/LotModel";
import { LotMapper } from "./LotMapper";

export class LandMapper {
  static json2Dto(body: any): LandDTO {
    return new LandDTO(body.id, body.name, body.description, body.lotList);
  }

  static dto2Domain(landDTO: LandDTO): Land {
    var land = new Land(
      landDTO.id,
      new Name(landDTO.name),
      new Description(landDTO.description),
      landDTO.lotList.map<Lot>((lotDto) => LotMapper.dto2Domain(lotDto))
    );
    return land;
  }

  static domain2Model(land: Land): ILandModel {
    let landModel = new LandModel({
      id: land.getID(),
      name: land.getName().getName(),
      description: land.getDescription().getDescription(),
      lotList: land.getLotList().map<ILotModel>((lot) => LotMapper.domain2Model(lot)),
    });
    return landModel;
  }

  static model2Domain(landModel: ILandModel): Land {
    var land = new Land(
      landModel._id.valueOf(),
      new Name(landModel.name),
      new Description(landModel.description),
      landModel.lotList.map<Lot>((lotModel) => LotMapper.model2Domain(lotModel))
    );
    return land;
  }

  static domain2Dto(land: Land): LandDTO {
    let landDto = new LandDTO(
      land.getID(),
      land.getName().getName(),
      land.getDescription().getDescription(),
      land.getLotList().map<LotDTO>((lot) => LotMapper.domain2Dto(lot))
    );
    return landDto;
  }
}
