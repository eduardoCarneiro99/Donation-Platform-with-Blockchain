import { Expenditure } from "../Domain/User/Expenditure";
import { ExpenditureDTO } from "../DTO/ExpenditureDTO";
import ExpenditureModel, { IExpenditureModel } from "../Model/ExpenditureModel";

export class ExpenditureMapper {
  static json2Dto(body: any): ExpenditureDTO {
    return new ExpenditureDTO(body.id, body.value, body.justification, body.date, body.transactionId);
  }

  static dto2Domain(expenditureDTO: ExpenditureDTO): Expenditure {
    let expenditure = new Expenditure(
      expenditureDTO.id,
      expenditureDTO.value,
      expenditureDTO.justification,
      new Date(expenditureDTO.date),
      expenditureDTO.transactionId
    );
    return expenditure;
  }

  static domain2Model(expenditure: Expenditure): IExpenditureModel {
    let expenditureModel = new ExpenditureModel({
      id: expenditure.getID(),
      value: expenditure.getValue(),
      justification: expenditure.getJustification(),
      date: expenditure.getDate().toString(),
      transactionId: expenditure.getTransactionId(),
    });
    return expenditureModel;
  }

  static model2Domain(expenditureModel: IExpenditureModel): Expenditure {
    let expenditure = new Expenditure(
      expenditureModel.id,
      expenditureModel.value,
      expenditureModel.justification,
      new Date(expenditureModel.date),
      expenditureModel.transactionId
    );
    return expenditure;
  }

  static domain2Dto(expenditure: Expenditure): ExpenditureDTO {
    let expenditureDTO = new ExpenditureDTO(
      expenditure.getID(),
      expenditure.getValue(),
      expenditure.getJustification(),
      expenditure.getDate().toString(),
      expenditure.getTransactionId()
    );
    return expenditureDTO;
  }
}
