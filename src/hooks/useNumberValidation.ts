export const useNumberValidation = (setState: (value: React.SetStateAction<number>) => void, value: number | string, min: number, max: number) => {

    const valueInt = parseInt("" + value);
    if (valueInt < min || valueInt > max || isNaN(valueInt)) {
        return;
    }
    setState(valueInt);
}