import { Equipment } from "../Domain/Land/Equipment";
import { Name } from "../Domain/Shared/Name";
import { EquipmentDTO } from "../DTO/EquipmentDTO";
import EquipmentModel, { IEquipmentModel } from "../Model/EquipmentModel";

export class EquipmentMapper {
  static json2Dto(body: any): EquipmentDTO {
    return new EquipmentDTO(body.id, body.name);
  }

  static dto2Domain(equipmentDTO: EquipmentDTO): Equipment {
    var equipment = new Equipment(equipmentDTO.id, new Name(equipmentDTO.name));
    return equipment;
  }

  static domain2Model(equipment: Equipment): IEquipmentModel {
    let equipmentModel = new EquipmentModel({
      id: equipment.getID(),
      name: equipment.getName().getName(),
    });
    return equipmentModel;
  }

  static model2Domain(equipmentModel: IEquipmentModel): Equipment {
    var equipment = new Equipment(equipmentModel._id.valueOf(), new Name(equipmentModel.name));
    return equipment;
  }

  static domain2Dto(equipment: Equipment): EquipmentDTO {
    let equipmentDto = new EquipmentDTO(equipment.getID(), equipment.getName().getName());
    return equipmentDto;
  }
}
