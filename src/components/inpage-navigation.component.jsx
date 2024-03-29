import { useEffect, useRef, useState } from "react";

export let activeTabLineRef;
export let activeTabRef;

const InPageNavigation = ({
  routes,
  defaultHidden = [],
  defaulActiveIndex = 0,
  children,
}) => {
  let [inPageNavIndex, setInPageNavIndex] = useState(defaulActiveIndex);
  activeTabLineRef = useRef();
  activeTabRef = useRef();
  let [width, setWidth] = useState(window.innerWidth);
  let [isResizeEventAdded, setIsResizeEventAdded] = useState(false);

  const changePageState = (btn, i) => {
    let { offsetWidth, offsetLeft } = btn;
    activeTabLineRef.current.style.width = offsetWidth + "px";
    activeTabLineRef.current.style.left = offsetLeft + "px";
    setInPageNavIndex(i);
  };

  useEffect(() => {
    if (width > 766 && inPageNavIndex !== defaulActiveIndex) {
      changePageState(activeTabRef.current, defaulActiveIndex);
    }
    if (!isResizeEventAdded) {
      window.addEventListener("resize", () => {
        if (!isResizeEventAdded) {
          setIsResizeEventAdded(true);
          setWidth(window.innerWidth);
        }
      });
    }
    changePageState(activeTabRef.current, defaulActiveIndex);
  }, [defaulActiveIndex, width]);

  return (
    <>
      <div className="relative mb-8 bg-white border-b border-grey flex flex-nowrap overflow-x-auto">
        {routes.map((route, i) => {
          return (
            <button
              ref={i === defaulActiveIndex ? activeTabRef : null}
              onClick={(e) => {
                changePageState(e.target, i);
              }}
              key={i}
              className={
                "p-4 px-5 capitalize " +
                (i === inPageNavIndex ? "text-black" : "text-dark-grey ") +
                (defaultHidden.includes(route) ? "md:hidden" : "")
              }
            >
              {route}
            </button>
          );
        })}
        <hr
          ref={activeTabLineRef}
          className="absolute border-dark-grey bottom-0 duration-300"
        />
      </div>
      {Array.isArray(children) ? children[inPageNavIndex] : children}
    </>
  );
};

export default InPageNavigation;
