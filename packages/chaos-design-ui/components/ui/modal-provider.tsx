"use client";

import * as React from "react";

interface ModalConfig {
  id: string;
  content: React.ReactNode;
  title?: React.ReactNode;
  onClose?: () => void;
  closable?: boolean;
}

interface ModalContextValue {
  modals: ModalConfig[];
  openModal: (config: Omit<ModalConfig, "id">) => string;
  closeModal: (id: string) => void;
  closeAll: () => void;
}

const ModalContext = React.createContext<ModalContextValue | null>(null);

function useModal(): ModalContextValue {
  const ctx = React.useContext(ModalContext);
  if (!ctx) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return ctx;
}

interface ModalProviderProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
}

function ModalProvider({ children, ...props }: ModalProviderProps) {
  const [modals, setModals] = React.useState<ModalConfig[]>([]);

  const openModal = React.useCallback(
    (config: Omit<ModalConfig, "id">): string => {
      const id = `modal-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      setModals((prev) => [...prev, { ...config, id }]);
      return id;
    },
    [],
  );

  const closeModal = React.useCallback((id: string) => {
    setModals((prev) => {
      const modal = prev.find((m) => m.id === id);
      if (modal?.onClose) {
        setTimeout(() => modal.onClose?.(), 0);
      }
      return prev.filter((m) => m.id !== id);
    });
  }, []);

  const closeAll = React.useCallback(() => {
    setModals((prev) => {
      prev.forEach((m) => {
        setTimeout(() => m.onClose?.(), 0);
      });
      return [];
    });
  }, []);

  const contextValue = React.useMemo(
    () => ({ modals, openModal, closeModal, closeAll }),
    [modals, openModal, closeModal, closeAll],
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      {modals.map((modal, index) => (
        <div
          key={modal.id}
          data-slot="modal-provider-overlay"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50"
          style={{ zIndex: 60 + index }}
          onClick={(e) => {
            if (e.target === e.currentTarget && modal.closable !== false) {
              closeModal(modal.id);
            }
          }}
          aria-modal="true"
          role="dialog"
          {...props}
        >
          <div
            data-slot="modal-provider-content"
            className="bg-background relative w-full max-w-lg rounded-lg border p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {(modal.title || modal.closable !== false) && (
              <div className="mb-4 flex items-center justify-between">
                {modal.title && (
                  <h2 className="text-lg font-semibold">{modal.title}</h2>
                )}
                {modal.closable !== false && (
                  <button
                    type="button"
                    onClick={() => closeModal(modal.id)}
                    className="hover:bg-accent ml-auto rounded p-1"
                    aria-label="Close"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </button>
                )}
              </div>
            )}
            {modal.content}
          </div>
        </div>
      ))}
    </ModalContext.Provider>
  );
}

export { ModalProvider, useModal, ModalContext };
