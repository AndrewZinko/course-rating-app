import { useState } from "react";
import {Heading, Button, Paragraph, Tag, Rating} from "../components";

export default function Home(): JSX.Element {
    const [rating, setRating] = useState<number>(4);

    return (
        <>
            <Heading tag="h1">some content</Heading>
            <Button color="primary">Buy</Button>
            <Button color="neutral" arrow="right">More information</Button>
            <Paragraph fontSize="small">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita, quaerat deleniti et fuga facilis eum exercitationem aliquam quidem blanditiis, totam consectetur neque distinctio quia numquam officia, quam iste nostrum quae.</Paragraph>
            <Paragraph fontSize="medium">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum labore, perferendis eius quas recusandae ratione ab non sint qui, nesciunt libero. Excepturi, harum officiis. Libero perferendis labore sit minima eligendi.</Paragraph>
            <Paragraph fontSize="large">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae similique numquam consequatur cum eos eius dolorum error fugit alias, rem ex tempore tenetur eaque laborum id aut sit veniam cumque!</Paragraph>
            <Paragraph fontSize="large">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae similique numquam consequatur cum eos eius dolorum error fugit alias, rem ex tempore tenetur eaque laborum id aut sit veniam cumque!</Paragraph>
            <Tag size="small" color="danger">Info</Tag>
            <Tag size="medium" color="neutral">Info</Tag>
            <Tag size="small" color="neutral-outlined">Info</Tag>
            <Tag size="medium" color="primary-outlined">Info</Tag>
            <Tag size="small" color="success">Info</Tag>
            <Rating rating={rating} isEditable={true} setRating={setRating}/>
        </>
    );
}