import {routes} from '../constants';
import {Profile} from './profile';
import {Add_token} from './add_token';
import {BottomTab} from './bottomTab';
import {Buy} from './buy';
import {Passcode} from './login';
import {Notification} from './notification';
import {Receive} from './receive';
import {Sell} from './sell';
import {Send} from './quick_send';
import {Create_wallet} from './create_wallet';
import {Generate_pnemonic} from './generate_pnemonic';
import {Confirm_pneumonic} from './confirm_pneumonic';
import {Import_pneumonic} from './import_pneumonic';
import {Market} from './market';
import {Swap} from './swap';
import {Setting} from './bottomTab/setting';
import {Verify} from './verify';
import {Onboarding} from '../components/onboarding';

interface Route {
  path: string;
  component: any;
}

export const Routes: Route[] = [
  {
    path: routes.CREATE_WALLET,
    component: Create_wallet,
  },
  {
    path: routes.GEN_WALLET,
    component: Generate_pnemonic,
  },
  {
    path: routes.CONFIRM_WALLET,
    component: Confirm_pneumonic,
  },
  {
    path: routes.IMPORT_WALLET,
    component: Import_pneumonic,
  },
  {
    path: routes.ONBOARDING,
    component: Onboarding,
  },
  {
    path: routes.TWA,
    component: Passcode,
  },
  {
    path: routes.BOTTOM_TAB,
    component: BottomTab,
  },
  {
    path: routes.SEND,
    component: Send,
  },
  {
    path: routes.RECEIVE,
    component: Receive,
  },
  {
    path: routes.SWAP,
    component: Swap,
  },
  {
    path: routes.SELL,
    component: Sell,
  },
  {
    path: routes.BUY,
    component: Buy,
  },
  {
    path: routes.NOTIFICATIONS,
    component: Notification,
  },
  {
    path: routes.SETTING,
    component: Setting,
  },
  {
    path: routes.ADD_TOKEN,
    component: Add_token,
  },
  {
    path: routes.PROFILE,
    component: Verify,
  },
  {
    path: routes.MARKET,
    component: Market,
  },
];
