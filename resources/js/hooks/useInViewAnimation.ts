import { useInView } from "framer-motion";
import { useRef } from "react";

export default function useInViewAnimation() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });
    return { ref, isInView };
}
