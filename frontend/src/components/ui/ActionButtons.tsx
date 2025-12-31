"use client";

import Button from "./Button";

interface ActionButtonsProps {
  onCancel?: () => void;
  onReset?: () => void;
  onNext?: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
}

export default function ActionButtons({
  onCancel,
  onReset,
  onNext,
  nextDisabled = false,
  nextLabel = "Next",
}: ActionButtonsProps) {
  return (
    <div className="flex justify-between items-center pt-8 border-t border-gray-100 mt-4">
      <div className="flex space-x-4">
        {onCancel && (
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
        {onReset && (
          <Button variant="secondary" onClick={onReset}>
            Reset
          </Button>
        )}
      </div>
      
      {onNext && (
        <Button
          disabled={nextDisabled}
          onClick={onNext}
          className="font-bold"
        >
          {nextLabel}
        </Button>
      )}
    </div>
  );
}

