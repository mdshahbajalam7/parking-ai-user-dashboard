/* eslint-disable */
import { RouterProvider } from 'react-router-dom';

// routing
import router from 'routes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';

import ThemeCustomization from 'themes';
import {

  Provider as ReduxProvider,
} from "react-redux";
import { store, persistor } from "./Redux_app/store";


// auth provider

// ==============================|| APP ||============================== //

export default function App() {
  return (
    <ReduxProvider store={store}>
      <ThemeCustomization>
        <NavigationScroll>
          <>
            <RouterProvider router={router} />
          </>
        </NavigationScroll>
      </ThemeCustomization>
    </ReduxProvider>
  );
}
