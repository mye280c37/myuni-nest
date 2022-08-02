import { useState } from "react";

export default function useAdditionalInfoItem(values=null) {
    const [form, setForm] = useState({
        header: values.header,
        title: values.title,
        example: values.example,
        value: values.value
    });

    const onChange = (e) => {
        setForm({
          ...form,
          value: e.target.value
        });
        console.log(form);
    };

    return{
        form,
        onChange
    };
}