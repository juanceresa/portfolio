/*
Copyright 2022, Nitric Technologies Pty Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import * as React from 'react';
import classNames from 'classnames';
import TerminalBody, { TerminalLine } from './TerminalBody';

const getWindowStyle = (white: boolean) => {
  return classNames({
    'Terminal-window': true,
    'Terminal-window-white': white,
  });
};

const getTerminalStyle = (code: boolean) => {
  return classNames({
    'Terminal-term': true,
    'Terminal-term-code': code,
  });
};

const getButtonStyle = (type: string) => {
  return classNames({
    'Terminal-btn': true,
    'Terminal-btn-close': type === 'close',
    'Terminal-btn-minimize': type === 'minimize',
    'Terminal-btn-maximize': type === 'maximize',
  });
};

const getBodyStyle = (code: boolean) => {
  return classNames({
    'Terminal-body': true,
    'Terminal-body-animated': !code,
  });
};

const getConsoleStyle = (code: boolean, white: boolean) => {
  return classNames({
    'Terminal-console': true,
    'Terminal-console-code': code,
    'Terminal-console-white': white,
  });
};

export interface TerminalProps {
  children?: React.ReactNode | TerminalLine[];
  white?: boolean;
  height?: number;
  code?: boolean;
  onReplay?: () => void;
  completed?: boolean;
  replay?: boolean;
}

const Terminal: React.FC<TerminalProps> = ({
  children,
  white = false,
  height,
  code = false,
  onReplay,
  completed = false,
  replay = true,
}) => {
  // Handle different types of children
  const renderContent = () => {
    if (code) {
      // Code mode - render children as code
      return <code className="Terminal-code">{children}</code>;
    } else {
      // Terminal mode - expect array of lines
      const lines = Array.isArray(children) ? children as TerminalLine[] : [];
      
      if (lines.length === 0 && children) {
        // If children exists but isn't an array, show a warning
        console.warn('Terminal children should be an array of TerminalLine objects when code=false');
        return (
          <div className="Terminal-code">
            <span style={{ color: '#ff6b6b' }}>
              Error: Invalid terminal data format
            </span>
            <br />
          </div>
        );
      }

      return (
        <TerminalBody
          lines={lines}
          onReplay={onReplay}
          completed={completed}
          replay={replay}
          white={white}
        />
      );
    }
  };

  return (
    <div className={getWindowStyle(white)}>
      <div
        className={getTerminalStyle(code)}
        style={height ? { height } : undefined}
      >
        <div className="Terminal-header">
          <span className={getButtonStyle('close')} />
          <span className={getButtonStyle('minimize')} />
          <span className={getButtonStyle('maximize')} />
        </div>
        <div className={getBodyStyle(code)}>
          <div className={getConsoleStyle(code, white)}>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
export type { TerminalLine };