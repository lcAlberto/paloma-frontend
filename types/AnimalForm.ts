export interface AnimalFormData {
  name: string | undefined,
  code: string | undefined,
  sex: string | undefined,
  breed: breed | undefined,
  classification: classification | undefined,
  status: status | undefined,
  image: string | undefined,
  born_date: string | undefined,
  father_id: object | undefined,
  mother_id: object | undefined
}

export interface AnimalFormPayload {
  name: string | undefined,
  code: string | undefined,
  sex: string | undefined,
  breed: string | undefined,
  classification: string | undefined,
  status: string | undefined,
  image: string | undefined,
  born_date: string | undefined,
  father_id: object | undefined,
  mother_id: object | undefined
}

export interface breed {
  id: string | number,
  name: string
}

export interface classification {
  id: string | number,
  label: string,
  sex: string,
  tooltip: string | undefined,
}

export interface status {
  id: string | number,
  label: string,
  value: string,
}
