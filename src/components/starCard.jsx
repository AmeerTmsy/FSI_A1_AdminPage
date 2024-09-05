const StarCard = ( props ) => {
    const rating = props.rating
    return (
        <div>
            {Array.from({ length: rating }).map((_, index) => (
                <i key={index} className="ri-star-s-fill"></i>
            ))}
        </div>
    );
};

export default StarCard;