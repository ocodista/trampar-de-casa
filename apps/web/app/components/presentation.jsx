import useTyped from "../components/hooks/useTyped";
import { useRef } from "react";

const options = {
  strings: [
    `figma`,
    `kafka`,
    `typescript`,
    `javascript`,
    `react`,
    `tailwind`,
    `php`,
    `other`,
  ],
  typeSpeed: 90,
  backSpeed: 90,
  loop: true,
  cursorChar: `<span class="text-[20px]">|</span>`,
};

function Presentation() {
  const ref = useRef(null);
  useTyped(ref, options);
  return (
    <div className="absolute left-[78px]">
        <span
          className="text-[20px] text-black"
          ref={ref}
        />
    </div>
  );
}

export default Presentation;
