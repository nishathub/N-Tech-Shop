
const AdminHome = ({allProducts, categories, productBrands}) => {
    return (
        <div>
            <p className="md:text-lg font-semibold">Total Products <span className="font-bold">{allProducts.length}</span></p>
            <p className="md:text-lg font-semibold">Total Categories <span className="font-bold">{categories.length}</span></p>
            <p className="md:text-lg font-semibold">Total Brands <span className="font-bold">{productBrands.length}</span></p>
             
        </div>
    );
};

export default AdminHome;