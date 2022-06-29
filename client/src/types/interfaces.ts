interface DeviceViewport {
  deviceWidth?: string;
  deviceHeight?: string;
}

interface FormInputType {
  email: string;
  password: string;
}

interface RegisterInputType extends FormInputType {
  nickName: string;
  emailAuthNumber: string;
}

export type { DeviceViewport, FormInputType, RegisterInputType };
