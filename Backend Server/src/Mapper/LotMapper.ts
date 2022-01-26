import { Equipment } from "../Domain/Land/Equipment";
import { Lot } from "../Domain/Land/Lot";
import { Description } from "../Domain/Shared/Description";
import { Name } from "../Domain/Shared/Name";
import { EquipmentDTO } from "../DTO/EquipmentDTO";
import { LotDTO } from "../DTO/LotDTO";
import { IEquipmentModel } from "../Model/EquipmentModel";
import LotModel, { ILotModel } from "../Model/LotModel";
import { EquipmentMapper } from "./EquipmentMapper";

export class LotMapper {
  static json2Dto(body: any): LotDTO {
    return new LotDTO(
      body.id,
      body.name,
      body.description,
      body.equipmentList,
      body.minimumHumidity,
      body.maximumHumidity,
      body.currentHumidity,
      body.minimumTemperature,
      body.maximumTemperature,
      body.currentTemperature,
      body.cultivation
    );
  }

  static dto2Domain(lotDTO: LotDTO): Lot {
    var lot = new Lot(
      lotDTO.id,
      new Name(lotDTO.name),
      new Description(lotDTO.description),
      lotDTO.equipmentList.map<Equipment>((equipmentDto) => EquipmentMapper.dto2Domain(equipmentDto)),
      lotDTO.minimumHumidity,
      lotDTO.maximumHumidity,
      lotDTO.currentHumidity,
      lotDTO.minimumTemperature,
      lotDTO.maximumTemperature,
      lotDTO.currentTemperature,
      lotDTO.cultivation
    );
    return lot;
  }

  static domain2Model(lot: Lot): ILotModel {
    let lotModel = new LotModel({
      id: lot.getID(),
      name: lot.getName().getName(),
      description: lot.getDescription().getDescription(),
      equipmentList: lot
        .getEquipmentList()
        .map<IEquipmentModel>((equipment) => EquipmentMapper.domain2Model(equipment)),
      minimumHumidity: lot.getMinimumHumidity(),
      maximumHumidity: lot.getMaximumHumidity(),
      currentHumidity: lot.getCurrentHumidity(),
      minimumTemperature: lot.getMinimumTemperature(),
      maximumTemperature: lot.getMaximumTemperature(),
      currentTemperature: lot.getCurrentTemperature(),
      cultivation: lot.getCultivation(),
    });
    return lotModel;
  }

  static model2Domain(lotModel: ILotModel): Lot {
    var lot = new Lot(
      lotModel._id.valueOf(),
      new Name(lotModel.name),
      new Description(lotModel.description),
      lotModel.equipmentList.map<Equipment>((equipmentModel) => EquipmentMapper.model2Domain(equipmentModel)),
      lotModel.minimumHumidity,
      lotModel.maximumHumidity,
      lotModel.currentHumidity,
      lotModel.minimumTemperature,
      lotModel.maximumTemperature,
      lotModel.currentTemperature,
      lotModel.cultivation
    );
    return lot;
  }

  static domain2Dto(lot: Lot): LotDTO {
    let lotDto = new LotDTO(
      lot.getID(),
      lot.getName().getName(),
      lot.getDescription().getDescription(),
      lot.getEquipmentList().map<EquipmentDTO>((equipment) => EquipmentMapper.domain2Dto(equipment)),
      lot.getMinimumHumidity(),
      lot.getMaximumHumidity(),
      lot.getCurrentHumidity(),
      lot.getMinimumTemperature(),
      lot.getMaximumTemperature(),
      lot.getCurrentTemperature(),
      lot.getCultivation()
    );
    return lotDto;
  }
}
