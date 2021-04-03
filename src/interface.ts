import { Composer, Context, Scenes } from "telegraf";

interface ratings {
  condition?: string;
  location?: string;
  tracking?: string;
  overall?: string;
}
interface address {
  addressline?: string;
  location?: object;
  photoURL?: string;
}
interface MySession extends Scenes.WizardSession {
  // will be available under `ctx.session.mySessionProp`
  trackingNumber: string;
  rating: ratings;
  address: address;
}

export interface MyContext extends Context {
  // will be available under `ctx.myContextProp`
  myContextProp: string;

  // declare session type
  session: MySession;
  // declare scene type
  scene: Scenes.SceneContextScene<MyContext, Scenes.WizardSessionData>;
  // declare wizard type
  wizard: Scenes.WizardContextWizard<MyContext>;
}
