import { MdAddCircle } from "react-icons/md";
import { useState } from "react";
import { fetchFunc } from "../../api/fetchData";
import toast from "react-hot-toast";
import type { Provider, Package } from "../../types/types";

export default function AddProvider({
  close,
  fetchData,
  packages,
}: {
  close: () => void;
  fetchData: () => void;
  packages: Package[];
}) {
    const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>();
  const [packageId, setPackageId] = useState<number>();
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.value);
    }
  };

  const handleSubmit = async () => {
    if (!name || !address || !phone || !description || !image || !packageId) {
      toast.error("يرجى تعبئة جميع الحقول");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("address", address);
    formData.append("phone", phone);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("package_id", String(packageId));

    console.log(formData)
    setLoading(true);
    try {
      const { data: result, error, status } = await fetchFunc<Provider>(
        "providers",
        "post",
        {
          name: name,
          address: address,
          phone: phone,
          description: description,
          image: image,
          package_id: packageId
        }
      );

      if (status === 201 && result) {
        toast.success("تمت إضافة المزود بنجاح!");
        fetchData();
        close();
        return;
      }

      if (error) {
        toast.error(error);
        console.error(`API Error (${status}):`, error);
      } else {
        toast.error("حدث خطأ غير متوقع. حاول مرة أخرى.");
        console.warn("Unexpected response:", result);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "حدث خطأ غير متوقع";
      toast.error(message);
      console.error("Exception:", err);
    } finally {
      setLoading(false);
      setAddress("")
      setDescription("")
      setImage("")
      setName("")
      setPackageId(0)
      setPhone("")
    }
  };

  return (
    <form>
      <h1 className="text-xl text-center text-blue-950 font-semibold">
        إضافة مزود جديد
      </h1>

      {/* الاسم */}
      <div className="flex flex-col text-right gap-1 pt-6">
        <label htmlFor="name">اسم المزود</label>
        <input
          onChange={(e) => setName(e.target.value)}
          id="name"
          type="text"
          value={name}
          className="text-right outline-gray-300 p-2 text-blue-950 h-10 border border-gray-200 shadow rounded-xl"
        />
      </div>

      {/* العنوان */}
      <div className="flex flex-col text-right gap-1 pt-4">
        <label htmlFor="address">العنوان</label>
        <input
          onChange={(e) => setAddress(e.target.value)}
          id="address"
          type="text"
          value={address}
          className="text-right outline-gray-300 p-2 text-blue-950 h-10 border border-gray-200 shadow rounded-xl"
        />
      </div>

      {/* الهاتف */}
      <div className="flex flex-col text-right gap-1 pt-4">
        <label htmlFor="phone">رقم الهاتف</label>
        <input
          onChange={(e) => setPhone(e.target.value)}
          id="phone"
          type="text"
          value={phone}
          className="text-right outline-gray-300 p-2 text-blue-950 h-10 border border-gray-200 shadow rounded-xl"
        />
      </div>

      {/* الوصف */}
      <div className="flex flex-col text-right gap-1 pt-4">
        <label htmlFor="description">الوصف</label>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          id="description"
          value={description}
          rows={3}
          className="text-right outline-gray-300 p-2 text-blue-950 border border-gray-200 shadow rounded-xl"
        />
      </div>

      {/* الصورة */}
      <div className="flex flex-col text-right gap-1 pt-4">
        <label htmlFor="image">رابط صورة المزود</label>
        <input
          onChange={handleFileChange}
          id="image"
          value={image}
          type="url"
          className="text-right outline-gray-300 p-2 text-blue-950 border border-gray-200 shadow rounded-xl"
        />
      </div>

      {/* الباقة */}
      <div className="flex flex-col text-right gap-1 pt-4">
        <label htmlFor="package">اختر الباقة</label>
        <select
          onChange={(e) => setPackageId(Number(e.target.value))}
          id="package"
          value={packageId}
          className="text-right outline-gray-300 p-2 text-blue-950 h-10 border border-gray-200 shadow rounded-xl"
        >
          <option value={0}>اختر الباقة</option>
          {packages.map((pkg) => (
            <option value={pkg.id} key={pkg.id}>
              {pkg.name}
            </option>
          ))}
        </select>
      </div>

      {/* الزر */}
      <button
        disabled={loading}
        type="button"
        onClick={handleSubmit}
        className="w-4/12 mt-8 h-10 cursor-pointer rounded-lg bg-blue-950 gap-2 text-white flex items-center justify-center"
      >
        <MdAddCircle color="white" />
        {loading ? "جارٍ الإضافة..." : "إضافة"}
      </button>
    </form>
  );
}

