"use client";

import Button from "./Button";
import { BUTTON_LABELS } from "@/constants";

interface ActionButtonsProps {
  // Handlers
  onCancel?: () => void;
  onReset?: () => void;
  onNext?: () => void;
  onBack?: () => void;

  // Labels
  cancelLabel?: string;
  resetLabel?: string;
  nextLabel?: string;
  backLabel?: string;

  // Visibility
  showCancel?: boolean;
  showReset?: boolean;
  showNext?: boolean;
  showBack?: boolean;

  // State
  nextDisabled?: boolean;
  cancelDisabled?: boolean;
  resetDisabled?: boolean;
  backDisabled?: boolean;
}

export default function ActionButtons({
  onCancel,
  onReset,
  onNext,
  onBack,
  cancelLabel = BUTTON_LABELS.CANCEL,
  resetLabel = BUTTON_LABELS.RESET,
  nextLabel = BUTTON_LABELS.NEXT,
  backLabel = BUTTON_LABELS.BACK,
  showCancel = true,
  showReset = true,
  showNext = true,
  showBack = false,
  nextDisabled = false,
  cancelDisabled = false,
  resetDisabled = false,
  backDisabled = false,
}: ActionButtonsProps) {
  // Determine actual visibility (show only if callback provided AND showX is true)
  const shouldShowCancel = onCancel && showCancel;
  const shouldShowReset = onReset && showReset;
  const shouldShowNext = onNext && showNext;
  const shouldShowBack = onBack && showBack;

  return (
    <div className="flex justify-between items-center pt-8 border-t border-border mt-4">
      <div className="flex space-x-4">
        {shouldShowBack && (
          <Button variant="outline" onClick={onBack} disabled={backDisabled}>
            {backLabel}
          </Button>
        )}
        <div className="flex space-x-4">
          {shouldShowCancel && (
            <Button variant="ghost" onClick={onCancel} disabled={cancelDisabled}>
              {cancelLabel}
            </Button>
          )}
          {shouldShowReset && (
            <Button variant="secondary" onClick={onReset} disabled={resetDisabled}>
              {resetLabel}
            </Button>
          )}
        </div>
      </div>

      {shouldShowNext && (
        <Button
          disabled={nextDisabled}
          onClick={onNext}
          className="font-bold min-w-[120px]"
        >
          {nextLabel}
        </Button>
      )}
    </div>
  );
}

