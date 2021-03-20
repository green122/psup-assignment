export type AbstractApiType = {
  [key: string]: string | number | AbstractApiType[] | AbstractApiType;
};

export interface AbstractAppRecord {
  [key: string]: string | number;
}

export type AbstractAppType = AbstractApiType[];
