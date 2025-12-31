"use client";

import Button from "./Button";
import { BUTTON_LABELS } from "@/constants";

interface ActionButtonsProps {
  // Handlers
  onCancel?: () => void;
  onReset?: () => void;
  onNext?: () => void;

  // Labels
  cancelLabel?: string;
  resetLabel?: string;
  nextLabel?: string;

  // Visibility
  showCancel?: boolean;
  showReset?: boolean;
  showNext?: boolean;

  // State
  nextDisabled?: boolean;
  cancelDisabled?: boolean;
  resetDisabled?: boolean;
}

export default function ActionButtons({
  onCancel,
  onReset,
  onNext,
  cancelLabel = BUTTON_LABELS.CANCEL,
  resetLabel = BUTTON_LABELS.RESET,
  nextLabel = BUTTON_LABELS.NEXT,
  showCancel = true,
  showReset = true,
  showNext = true,
  nextDisabled = false,
  cancelDisabled = false,
  resetDisabled = false,
}: ActionButtonsProps) {
  // Determine actual visibility (show only if callback provided AND showX is true)
  const shouldShowCancel = onCancel && showCancel;
  const shouldShowReset = onReset && showReset;
  const shouldShowNext = onNext && showNext;

  return (
    <div className="flex justify-between items-center pt-8 border-t border-gray-100 mt-4">
      <div className="flex space-x-4">
        {shouldShowCancel && (
          <Button variant="secondary" onClick={onCancel} disabled={cancelDisabled}>
            {cancelLabel}
          </Button>
        )}
        {shouldShowReset && (
          <Button variant="secondary" onClick={onReset} disabled={resetDisabled}>
            {resetLabel}
          </Button>
        )}
      </div>

      {shouldShowNext && (
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

