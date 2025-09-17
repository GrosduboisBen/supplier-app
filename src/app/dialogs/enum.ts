export enum DialogMessage {
  CONFIRM_DELETE = 'Are you sure you want to delete this item?',
  CONFIRM_SUBMIT = 'Are you sure you want to submit this form?',
  OPERATION_SUCCESS = 'The operation was successful.',
}

export enum DialogEmitType {
  UPDATE = 'update',
  DELETE = 'delete',
  CREATE = 'create',
  CANCEL = 'cancel',
}
