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

export interface TerminalLine {
  id: string | number;
  cmd?: boolean;
  prompt?: string;
  element?: React.ReactElement;
  text?: string;
  color?: string;
  current?: boolean;
}

interface TerminalBodyProps {
  lines: TerminalLine[];
  onReplay?: () => void;
  completed?: boolean;
  replay?: boolean;
  white?: boolean;
}

const TerminalCursor: React.FC = () => (
  <span className="Terminal-cursor" />
);

const TerminalPrompt: React.FC<{ prefix?: string }> = ({ prefix }) => (
  <span className="Terminal-prompt">{prefix || '$ '}</span>
);

const TerminalBody: React.FC<TerminalBodyProps> = ({
  lines = [],
  onReplay,
  completed = false,
  replay = true,
  white = false,
}) => {
  const btnClassName = white
    ? 'Terminal-control-btn Terminal-control-btn-white'
    : 'Terminal-control-btn';

  const renderLines = React.useCallback(() => {
    if (!Array.isArray(lines)) {
      console.warn('Terminal lines should be an array');
      return null;
    }

    return lines.map((line, index) => {
      // Ensure each line has a valid id
      const lineId = line.id || `line-${index}`;
      
      return (
        <React.Fragment key={lineId}>
          {line.cmd && <TerminalPrompt prefix={line.prompt} />}
          {line.element ? (
            line.element
          ) : line.text ? (
            <span style={{ color: line.color || 'inherit' }}>
              {line.text}
            </span>
          ) : null}
          {line.current && line.cmd && <TerminalCursor />}
          <br />
        </React.Fragment>
      );
    });
  }, [lines]);

  return (
    <div>
      <div className="Terminal-code">
        {renderLines()}
      </div>
      {completed && replay && onReplay && (
        <button 
          className={btnClassName} 
          onClick={onReplay}
          type="button"
        >
          Replay
        </button>
      )}
    </div>
  );
};

export default TerminalBody;