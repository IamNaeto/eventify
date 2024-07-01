import { TbSend, TbCopy } from "react-icons/tb";
import { toast } from "sonner";

const ShareInvites = ({ eventLink }) => {
  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(eventLink);
    toast.success("Event link copied to clipboard!")
  };

  return (
    <section className="min-h-[70vh] text-2xl text-[#3C3C3C] flex flex-col items-center gap-2">
      <div className="min-w-[60%] grid gap-6">
        <div className="grid gap-2">
          <h1 className="text-2xl font-bold">Share Event Link</h1>
          <p className="text-sm text-[#767676]">Share your invite link across different social media account</p>
        </div>

        <div className="grid gap-4">
          <div className="flex items-center justify-between gap-6 p-4 rounded-lg shadow border-b border-b-[#EBEBEB]">
            <div className="flex items-center gap-4">
              <img src="/img/fb.png" alt="fb" className="w-[30px] h-[30px]" />
              <div className="grid gap-1">
                <h3 className="text-sm font-semibold">Facebook</h3>
                <p className="text-xs text-[#767676]">Share your event to your Facebook page and community</p>
              </div>
            </div>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventLink)}`} target="_blank" rel="noopener noreferrer">
              <TbSend className="text-xl cursor-pointer hover:text-[#E0580C] transition-transform duration-300 ease-in-out transform hover:scale-[1.5]" />
            </a>
          </div>

          <div className="flex items-center justify-between gap-6 p-4 rounded-lg shadow border-b border-b-[#EBEBEB]">
            <div className="flex items-center gap-4">
              <img src="/img/ig.png" alt="ig" className="w-[30px] h-[30px]" />
              <div className="grid gap-1">
                <h3 className="text-sm font-semibold">Instagram</h3>
                <p className="text-xs text-[#767676]">Go Instagram LIVE by sharing your post on your Instagram account</p>
              </div>
            </div>
            <a href={`https://www.instagram.com/?url=${encodeURIComponent(eventLink)}`} target="_blank" rel="noopener noreferrer">
              <TbSend className="text-xl cursor-pointer hover:text-[#E0580C]  transition-transform duration-300 ease-in-out transform hover:scale-[1.5]" />
            </a>
          </div>

          <div className="flex items-center justify-between gap-6 p-4 rounded-lg shadow border-b border-b-[#EBEBEB]">
            <div className="flex items-center gap-4">
              <img src="/img/x.png" alt="x" className="w-[30px] h-[30px]" />
              <div className="grid gap-1">
                <h3 className="text-sm font-semibold">X</h3>
                <p className="text-xs text-[#767676]">Share to your audience on X with one single tap</p>
              </div>
            </div>
            <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(eventLink)}`} target="_blank" rel="noopener noreferrer">
              <TbSend className="text-xl cursor-pointer hover:text-[#E0580C]  transition-transform duration-300 ease-in-out transform hover:scale-[1.5]" />
            </a>
          </div>

          <div className="flex items-center justify-between gap-6 p-4 border-b border-b-[#EBEBEB] rounded-lg shadow">
            <div className="flex items-center gap-4">
              <img src="/img/li.png" alt="li" className="w-[30px] h-[30px]" />
              <div className="grid gap-1">
                <h3 className="text-sm font-semibold">LinkedIn</h3>
                <p className="text-xs text-[#767676]">Share your event on LinkedIn and encourage others to register</p>
              </div>
            </div>
            <a href={`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(eventLink)}`} target="_blank" rel="noopener noreferrer">
              <TbSend className="text-xl cursor-pointer hover:text-[#E0580C] transition-transform duration-300 ease-in-out transform hover:scale-[1.5]" />
            </a>
          </div>

          <div className="flex items-center justify-between gap-6 p-4 border-b border-b-[#EBEBEB] rounded-lg shadow">
            <div className="flex items-center gap-4">
              <img src="/img/wa.png" alt="wa" className="w-[30px] h-[30px]" />
              <div className="grid gap-1">
                <h3 className="text-sm font-semibold">WhatsApp</h3>
                <p className="text-xs text-[#767676]">Share your event link to your WhatsApp audience</p>
              </div>
            </div>
            <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(eventLink)}`} target="_blank" rel="noopener noreferrer">
              <TbSend className="text-xl cursor-pointer hover:text-[#E0580C] transition-transform duration-300 ease-in-out transform hover:scale-[1.5]" />
            </a>
          </div>

          <div className="flex items-center justify-between gap-4 py-3 px-6 font-semibold rounded-lg border-2 border-[#FEFEFE] shadow">
            <p className="text-sm text-[#767676]">{eventLink}</p>
            <p
              className="flex items-center gap-2 text-[16px] text-[#E0580C] cursor-pointer  transition-transform duration-300 ease-in-out transform hover:scale-90"
              onClick={copyLinkToClipboard}
            >
              Copy Link <TbCopy className="text-2xl hover:text-[#E0580C]" />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShareInvites;
