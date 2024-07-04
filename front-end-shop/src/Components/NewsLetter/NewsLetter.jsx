
const NewsLetter = () => {
    return (
        <div className="flex mt-8 md:mt-0 gap-4 flex-col md:flex-row justify-between items-center p-8 max-w-6xl mx-auto md:px-4 px-1">
            <div>
                <p className="text-lg">Sign up to Newsletter and get a <span className="text-xl text-[#3BBFE3]">$20</span> coupon on first Shopping</p>
            </div>
            <div>
                <div className="join">
                    <input className="input input-bordered join-item" placeholder="Email" />
                    <button className="btn join-item rounded-r-md ">Subscribe</button>
                </div>
            </div>
        </div>
    );
};

export default NewsLetter;