import 'react-native-gesture-handler';
import {Navigation} from 'react-native-navigation';

import App from './App';
import Sheet from './src/components/sheet';
import Parent from './src/components/parent';
import Colored from './src/components/colored';

const Register = (Name, Component) => {
  Navigation.registerComponent(Name, () => Component);
};

Register('App', App)
Register('Sheet', Sheet)
Register('Colored', Colored)
Register('Parent', Parent)

Navigation.events().registerAppLaunchedListener(async () => {
  await Navigation.setDefaultOptions({
    statusBar: {
      visible: true,
      blur: true,
      animate: true,
    },
    bottomTab: {
      fontSize: 12,
      selectedFontSize: 12,
      drawBehind: false,
      selectedIconColor: '#1C45E6',
      selectedTextColor: '#1C45E6',
    },
  });
  await Navigation.setRoot({
    root: {
      component: {
        name: 'App',
      },
    },
  });
});
