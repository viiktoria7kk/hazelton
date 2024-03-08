export class ApartmentDTO {
  readonly id: string;
  readonly name: string;
  readonly isEmpty: boolean;
}

export class CreateApartmentDto {
  readonly name: string;
  readonly isEmpty: boolean;
}

export class UpdateApartmentDto {
  readonly name: string;
  readonly isEmpty: boolean;
}

