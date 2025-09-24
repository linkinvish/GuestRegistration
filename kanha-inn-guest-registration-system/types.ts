
export interface SecondaryGuest {
  id: string;
  name: string;
  idType: string;
  idNumber: string;
  idFrontImage: File | null;
  idBackImage: File | null;
}

export interface FormData {
  checkInDate: string;
  roomType: string;
  tariff: number | string;
  primaryGuestName: string;
  primaryGuestPhone: string;
  primaryGuestEmail: string;
  primaryGuestAddress: string;
  primaryGuestIdType: string;
  primaryGuestIdNumber: string;
  primaryGuestIdFrontImage: File | null;
  primaryGuestIdBackImage: File | null;
  secondaryGuests: SecondaryGuest[];
}

export type ValidationErrors = {
  [K in keyof Omit<FormData, 'secondaryGuests'>]?: string;
} & {
  secondaryGuests?: {
    [index: number]: {
      [K in keyof Omit<SecondaryGuest, 'id'>]?: string;
    };
  };
};
