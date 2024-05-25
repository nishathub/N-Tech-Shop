
const NewsLetter = () => {
    return (
        <div className="flex gap-4 flex-col md:flex-row justify-between items-center bg-teal-900 p-8 rounded-md">
            <div>
                <p className="text-lg">Sign up to Newsletter and get a <span className="text-xl text-accent">$20</span> coupon on first Shopping</p>
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