import React from 'react';

import { config } from '../config/config';
import { Tool } from '../types/annotations';

interface Props {
  currentTool: string;
  onToolChange: (tool: Tool) => void;
  onExportAnnotations: () => void;
  onClose: () => void;
  hasAnnotations: boolean;
  imageId: string;
}

export const ToolBar: React.FC<Props> = ({
  currentTool,
  onToolChange,
  onExportAnnotations,
  onClose,
  hasAnnotations,
  imageId,
}) => {
  return (
    <div className="flex justify-center items-center space-x-2">
      <button
        onClick={onClose}
        className="px-2 py-2 text-red-500 text-base leading-tight tracking-tight font-semibold rounded-lg"
      >
        Close
      </button>
      {!hasAnnotations ? (
        <div className="space-x-2">
          <button
            onClick={() => onToolChange('box')}
            className={`px-2 py-2 text-base font-semibold rounded-lg ${
              currentTool === 'box' ? 'text-white' : 'text-[#828284]'
            } hover:text-white`}
          >
            Box
          </button>
          <button
            onClick={() => onToolChange('polygon')}
            className={`px-2 py-2 text-base font-semibold rounded-lg ${
              currentTool === 'polygon' ? 'text-white' : 'text-[#828284]'
            } hover:text-white`}
          >
            Polygon
          </button>
          <button
            onClick={onExportAnnotations}
            className="px-2 py-2 text-[#828284] text-base font-semibold rounded-lg hover:text-white"
          >
            Export
          </button>
        </div>
      ) : (
        <a
          href={`${config.baseUrl}/images/${imageId}/download-annotations`}
          className="px-2 py-2 text-base font-semibold rounded-lg text-[#828284] hover:text-white"
        >
          Download (json)
        </a>
      )}
    </div>
  );
};
