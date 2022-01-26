/*
async addLotByUserIDLandID(id: string, landID: string, lotDTO: LotDTO): Promise<LotDTO> {
    const lot: Lot = LotMapper.dto2Domain(lotDTO);
    const lotResponse: Lot = await this.userRepository.addLotToUser(id, landID, lot);
    const lotResponseDTO: LotDTO = LotMapper.domain2Dto(lotResponse);
    return lotResponseDTO;
  }

  async updateUserLotByUserIDLandID(id: string, landID: string, lotDTO: LotDTO): Promise<LotDTO> {
    const lot: Lot = LotMapper.dto2Domain(lotDTO);
    const lotResponse: Lot = await this.userRepository.updateUserLot(id, landID, lot);
    const lotResponseDTO: LotDTO = LotMapper.domain2Dto(lotResponse);
    return lotResponseDTO;
  }

  async getUserLotByUserIDLandID(userID: string, landID: string, lotID: string): Promise<LotDTO> {
    const lotResponseDomain: Lot = await this.userRepository.findUserLotById(userID, landID, lotID);
    const lotResponseDTO: LotDTO = LotMapper.domain2Dto(lotResponseDomain);
    return lotResponseDTO;
  }

  async deleteUserLot(userID: string, landID: string, lotID: string): Promise<boolean> {
    return await this.userRepository.deleteUserLot(userID, landID, lotID);
  }

  async addEquipmentByUserIDLandIDLotID(
    id: string,
    landID: string,
    lotID: string,
    equipmentDTO: EquipmentDTO
  ): Promise<EquipmentDTO> {
    const equipment: Equipment = EquipmentMapper.dto2Domain(equipmentDTO);
    const equipmentResponse: Equipment = await this.userRepository.addEquipmentToUser(id, landID, lotID, equipment);
    const equipmentResponseDTO: EquipmentDTO = EquipmentMapper.domain2Dto(equipmentResponse);
    return equipmentResponseDTO;
  }

  async updateEquipmentByUserIDLandIDLotID(
    id: string,
    landID: string,
    lotID: string,
    equipmentDTO: EquipmentDTO
  ): Promise<EquipmentDTO> {
    const equipment: Equipment = EquipmentMapper.dto2Domain(equipmentDTO);
    const equipmentResponse: Equipment = await this.userRepository.updateUserEquipment(id, landID, lotID, equipment);
    const equipmentResponseDTO: EquipmentDTO = EquipmentMapper.domain2Dto(equipmentResponse);
    return equipmentResponseDTO;
  }

  async getEquipmentByUserIDLandIDLotIDEquipmentID(
    userID: string,
    landID: string,
    lotID: string,
    equipmentID: string
  ): Promise<EquipmentDTO> {
    const equipmentResponseDomain: Equipment = await this.userRepository.findUserEquipmentById(
      userID,
      landID,
      lotID,
      equipmentID
    );
    const equipmentResponseDTO: EquipmentDTO = EquipmentMapper.domain2Dto(equipmentResponseDomain);
    return equipmentResponseDTO;
  }

  async deleteEquipment(userID: string, landID: string, lotID: string, equipmentID: string): Promise<boolean> {
    return await this.userRepository.deleteUserEquipment(userID, landID, lotID, equipmentID);
  }*/
