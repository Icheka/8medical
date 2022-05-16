import { DetailedHTMLProps, FunctionComponent, InputHTMLAttributes, LabelHTMLAttributes, ReactNode } from "react";

import { useField } from "formik";

export interface IInputField extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label?: string;
    description?: string;
    showLabel?: boolean;
    error?: string | false;
    variant?: "primary" | "clear";
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}

export const InputField: FunctionComponent<IInputField> = ({ className = "", leftIcon, rightIcon, showLabel, label, error, description, variant = "primary", ...props }) => {
    const classNames = ["focus:outline-none"];
    if (variant === "clear") classNames.push("block w-full px-4 py-3 rounded-md !border-0 !outline-none text-base text-gray-900 placeholder-gray-500");
    if (variant === "primary") classNames.push("!border-0 !outline-none block w-full px-1 py-2 rounded-md placeholder-gray-400 sm:text-sm");
    classNames.push(className);

    return (
        <div>
            {showLabel && label && (
                <>
                    <Label htmlFor={props.id} text={label} className={"mb-1"} />
                    <FieldDescription htmlFor={props.id} text={description} className={"mb-1"} />
                </>
            )}
            {label && <Label text={label} htmlFor={props.id} className={`sr-only`} />}
            <div className={`w-full px-2 border border-[#DFE2E5] rounded-[8px] flex items-center space-x-2 bg-white`}>
                {leftIcon}
                <input className={classNames.join(" ")} {...props} />
                {rightIcon}
            </div>
            <FieldError error={error} />
        </div>
    );
};

export const FieldError: FunctionComponent<{ error?: string | false; children?: any }> = ({ children, error }) => <div className={`text-xs text-red-500 mt-1`}>{error ?? children}</div>;

interface ILabel extends DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> {
    text?: string;
}

export const Label: FunctionComponent<ILabel> = ({ text, children, className, ref, ...props }) => (
    <label className={`block text-sm font-medium text-gray-700 ${className}`} {...props}>
        {text ?? children}
    </label>
);

export const FieldDescription: FunctionComponent<ILabel> = ({ text, children, className, ...props }) => (
    <label className={`mb-2 text-xs font-normal text-gray-400 ${className}`} {...props}>
        {text ?? children}
    </label>
);

export const FormikField: React.FC<IInputField> = ({ name, value, ...props }) => {
    const [field, meta, helpers] = useField({ name: name!, value });

    return <InputField {...field} {...props} error={meta.touched && meta.error} />;
};
