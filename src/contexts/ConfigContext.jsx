import PropTypes from 'prop-types';
import { createContext } from 'react';

// project imports
import defaultConfig from 'config';
import useLocalStorage from 'hooks/useLocalStorage';

// initial state
const initialState = {
  ...defaultConfig,
  mode: 'light',
  onChangeMode: () => {},
  onChangeFontFamily: () => {},
  onChangeBorderRadius: () => {},
  onReset: () => {}
};

// ==============================|| CONFIG CONTEXT & PROVIDER ||============================== //

const ConfigContext = createContext(initialState);

function ConfigProvider({ children }) {
  const [config, setConfig] = useLocalStorage('parkingai-theme-config', {
    fontFamily: initialState.fontFamily,
    borderRadius: initialState.borderRadius,
    mode: 'light'
  });

  const onChangeMode = (newMode) => {
    const targetMode = newMode || (config.mode === 'dark' ? 'light' : 'dark');
    setConfig({
      ...config,
      mode: targetMode
    });
  };

  const onChangeFontFamily = (fontFamily) => {
    setConfig({
      ...config,
      fontFamily
    });
  };

  const onChangeBorderRadius = (event, newValue) => {
    setConfig({
      ...config,
      borderRadius: newValue
    });
  };

  const onReset = () => {
    setConfig({ ...defaultConfig, mode: 'light' });
  };

  return (
    <ConfigContext.Provider
      value={{
        ...config,
        mode: config.mode || 'light',
        onChangeMode,
        onChangeFontFamily,
        onChangeBorderRadius,
        onReset
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}

export { ConfigProvider, ConfigContext };

ConfigProvider.propTypes = { children: PropTypes.node };
