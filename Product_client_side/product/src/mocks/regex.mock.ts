export const regexMocks = {
  name: '^[a-zA-Z ]*$',
  password: '^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$',
  email: '^[a-zA-Z0-9]+[-_a-zA-Z.0-9]*@[a-zA-Z0-9]{2,9}.[a-zA-Z]{2,4}$',
  phone: '[6-9]\\d{9}',
  otp: '^[0-9]{6,6}',
  address: '^[a-zA-Z ]*$',
  minCost: '[5-9]\\d{2}',
  maxCost: '[1-4]\\d{4}',
  price: '^d{3,5}$|^[5-9][0-9]d{2}$|^50000$',
  rating: '[1-5]{1}',
  cost: '^(?:[1-9][0-9]{0,4}(?:.d{1,2})?|50000|50000.00)$',
  comment: '^[a-zA-Z0-9 ]*$',
  capacity: '^(?:[1-9][0-9]{0,4}(?:.d{1,2})?|50000|50000.00)$',
  businessName: '^(?!s)(?!.s$)(?=.[a-zA-Z0-9])[a-zA-Z0-9 ~?!-":$@#^*]{5,30}$',
};
