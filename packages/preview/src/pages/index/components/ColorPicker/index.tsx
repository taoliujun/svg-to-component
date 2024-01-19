import { useBoolean, useClickAway } from 'ahooks';
import { ButtonHTMLAttributes, FC, forwardRef, useEffect, useRef } from 'react';
import { SketchPicker } from 'react-color';

interface Props {
    color: string;
    onChange: (input: string) => void;
}

let globalZIndex = 10;

const ColorButton = forwardRef<HTMLButtonElement, Pick<Props, 'color'> & ButtonHTMLAttributes<HTMLButtonElement>>(
    ({ color, ...props }, ref) => {
        return (
            <button
                className="w-6 h-6 outline-none border"
                style={{
                    background: color,
                }}
                {...props}
                ref={ref}
            />
        );
    }
);

const Picker = forwardRef<HTMLDivElement, Pick<Props, 'color' | 'onChange'>>(({ color, onChange }, ref) => {
    return (
        <div className="fixed" ref={ref}>
            <SketchPicker
                color={color}
                onChange={(e) => {
                    onChange(e.hex);
                }}
                disableAlpha
            />
        </div>
    );
});

export const ColorPicker: FC<Props> = ({ color, onChange }) => {
    const [pickerShow, pickerToggle] = useBoolean();
    const buttonRef = useRef<HTMLButtonElement>(null);
    const pickerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (pickerShow) {
            const buttonRect = buttonRef.current?.getBoundingClientRect();
            const pickerRect = pickerRef.current?.getBoundingClientRect();
            const documentWidth = document.documentElement.clientWidth;
            const documentHeight = document.documentElement.clientHeight;
            const documentScrollTop = document.documentElement.scrollTop;
            const documentScrollLeft = document.documentElement.scrollLeft;

            if (pickerRef.current && pickerRect && buttonRect) {
                const offsetY = 2;
                let left = 0;
                let top = 0;

                if (buttonRect.left + pickerRect.width > documentWidth) {
                    left = documentScrollLeft + buttonRect.right - pickerRect.width;
                } else {
                    left = documentScrollLeft + buttonRect.left;
                }

                if (buttonRect.bottom + offsetY + pickerRect.height > documentHeight) {
                    top = documentScrollTop + buttonRect.top - offsetY - pickerRect.height;
                } else {
                    top = documentScrollTop + buttonRect.bottom + offsetY;
                }

                if (left) {
                    pickerRef.current.style.left = `${left}px`;
                }
                if (top) {
                    pickerRef.current.style.top = `${top}px`;
                }
                globalZIndex += 1;
                pickerRef.current.style.zIndex = `${globalZIndex}`;
            }
        }
    }, [pickerShow]);

    useClickAway(pickerToggle.setFalse, [buttonRef, pickerRef]);

    return (
        <>
            <ColorButton color={color} onClick={pickerToggle.setTrue} ref={buttonRef} />
            {pickerShow && <Picker color={color} onChange={onChange} ref={pickerRef} />}
        </>
    );
};
