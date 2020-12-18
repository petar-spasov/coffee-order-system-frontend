import React from "react";
import Header, {Tag} from "../../atoms/Header/Header";
import CoffeeSorts from "../../organisms/CoffeeSorts/CoffeeSorts";

type Props = {
  title: string,
  subtitle: string,
};

const CreateOrder:React.FC<Props> = ({title, subtitle}) => {
    return (
        <>
            <Header text={title} Element={Tag.H1}/>
            <Header text={subtitle} Element={Tag.H5}/>
            <CoffeeSorts/>
        </>
    );
}

export default CreateOrder;
