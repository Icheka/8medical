export const FormatNigerianNumber = (
    phone: string,
    {
        withCountryCode,
    }: {
        withCountryCode?: boolean;
    }
) => {
    phone = phone.replace(/[\+]/, "");
    phone = phone.split(" ").join("");

    if (phone.startsWith("234")) {
        phone = phone.slice(3);
    }

    phone = spaceNigerianNumber(phone);

    if (withCountryCode) phone = "+234 (0) ".concat(phone.slice(1));
    return phone;
};

const spaceNigerianNumber = (phone: string) => {
    phone = phone.slice(0, 11);
    if (!phone.startsWith("0")) phone = "0".concat(phone);
    const splits = [phone.slice(0, 4), phone.slice(4, 7), phone.slice(7)];
    return splits.join(" ");
};
