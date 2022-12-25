import react from "react";

type ViewContextState = {
  headerOffset: number;
  setHeaderOffset: react.Dispatch<react.SetStateAction<number>>;
  footerOffset: number;
  setFooterOffset: react.Dispatch<react.SetStateAction<number>>;
};

const initialState: ViewContextState = {
  headerOffset: 0,
  setHeaderOffset: async () => {},
  footerOffset: 0,
  setFooterOffset: async () => {},
};

const ViewContext = react.createContext<ViewContextState>(initialState);

export const useViewContext = () => react.useContext(ViewContext);

export const ViewProvider = ({ children }: any) => {
  const [headerOffset, setHeaderOffset] = react.useState(0);
  const [footerOffset, setFooterOffset] = react.useState(0);

  return (
    <ViewContext.Provider
      value={{ headerOffset, setHeaderOffset, footerOffset, setFooterOffset }}
    >
      {children}
    </ViewContext.Provider>
  );
};
