import { MdEdit } from 'react-icons/md';
import { useState, type ReactNode } from 'react';
import { fetchFunc } from '../../api/fetchData';
import type { Package, region } from '../../types/types';
import toast from 'react-hot-toast';

export default function EditPackage({
  close,
  fetchData,
  regions,
  pkg, // 👈 الباقة المراد تعديلها
}: {
  close: () => void;
  fetchData: () => void;
  regions: region[];
  pkg: Record<string, ReactNode>;
}) {
  const [name, setName] = useState<string>(pkg.name?String(pkg.name):"");
  const [speed, setSpeed] = useState<string>(pkg.speed?String(pkg.speed):"");
  const [limit, setLimit] = useState<string>(pkg.limit?String(pkg.limit):"");
  const [duration, setDuration] = useState<string>(pkg.duration?String(pkg.duration):"");
  const [price, setPrice] = useState<string>(pkg.price?String(pkg.price):"");
  const [slug, setSlug] = useState<string>(pkg.slug?String(pkg.slug):"");
  const [regionId, setRegionId] = useState<number>(pkg.region_id?Number(pkg.region_id):0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !speed || !limit || !duration || !price || !slug || !regionId) {
      toast.error('يرجى تعبئة جميع الحقول');
      return;
    }

    setLoading(true);
    try {
      const { data: result, error, status } = await fetchFunc<Package>(
        `packages/${pkg.id}`, // 👈 تعديل حسب id الباقة
        'put', // 👈 استبدال POST بـ PUT
        {
          name,
          speed,
          limit,
          duration,
          price,
          slug,
          region_id: regionId,
        }
      );

      if ((status === 200 || status === 204) && result) {
        toast.success('تم تعديل الباقة بنجاح!');
        fetchData();
        close();
        return;
      }

      if (error) {
        toast.error(error);
        console.error(`API Error (${status}):`, error);
      } else {
        toast.error('حدث خطأ غير متوقع. حاول مرة أخرى.');
        console.warn('Unexpected response:', result);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'حدث خطأ غير متوقع';
      toast.error(message);
      console.error('Exception:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form>
      <h1 className="text-xl text-center text-blue-950 font-semibold">
        تعديل الباقة
      </h1>

      {/* اسم الباقة */}
      <div className="flex flex-col text-right gap-1 pt-6">
        <label htmlFor="name">اسم الباقة</label>
        <input
          onChange={(e) => setName(e.target.value)}
          id="name"
          type="text"
          value={name}
          className="text-right outline-gray-300 p-2 text-blue-950 h-10 border border-gray-200 shadow rounded-xl"
        />
      </div>

      {/* slug */}
      <div className="flex flex-col text-right gap-1 pt-4">
        <label htmlFor="slug">المُعرف (Slug)</label>
        <input
          onChange={(e) => setSlug(e.target.value)}
          id="slug"
          type="text"
          value={slug}
          placeholder="مثلاً: basic-package"
          className="text-right outline-gray-300 p-2 text-blue-950 h-10 border border-gray-200 shadow rounded-xl"
        />
      </div>

      {/* السرعة */}
      <div className="flex flex-col text-right gap-1 pt-4">
        <label htmlFor="speed">السرعة</label>
        <input
          onChange={(e) => setSpeed(e.target.value)}
          id="speed"
          type="text"
          value={speed}
          placeholder="مثلاً: 50 Mbps"
          className="text-right outline-gray-300 p-2 text-blue-950 h-10 border border-gray-200 shadow rounded-xl"
        />
      </div>

      {/* الحد */}
      <div className="flex flex-col text-right gap-1 pt-4">
        <label htmlFor="limit">الحد</label>
        <input
          onChange={(e) => setLimit(e.target.value)}
          id="limit"
          type="text"
          value={limit}
          placeholder="مثلاً: 100 GB"
          className="text-right outline-gray-300 p-2 text-blue-950 h-10 border border-gray-200 shadow rounded-xl"
        />
      </div>

      {/* المدة */}
      <div className="flex flex-col text-right gap-1 pt-4">
        <label htmlFor="duration">المدة</label>
        <input
          onChange={(e) => setDuration(e.target.value)}
          id="duration"
          type="text"
          value={duration}
          placeholder="مثلاً: 1 Year"
          className="text-right outline-gray-300 p-2 text-blue-950 h-10 border border-gray-200 shadow rounded-xl"
        />
      </div>

      {/* السعر */}
      <div className="flex flex-col text-right gap-1 pt-4">
        <label htmlFor="price">السعر</label>
        <input
          onChange={(e) => setPrice(e.target.value)}
          id="price"
          type="text"
          value={price}
          placeholder="مثلاً: 150 USD"
          className="text-right outline-gray-300 p-2 text-blue-950 h-10 border border-gray-200 shadow rounded-xl"
        />
      </div>

      {/* المنطقة */}
      <div className="flex flex-col text-right gap-1 pt-4">
        <label htmlFor="region">اختر المنطقة</label>
        <select
          onChange={(e) => setRegionId(Number(e.target.value))}
          id="region"
          value={regionId}
          className="text-right outline-gray-300 p-2 text-blue-950 h-10 border border-gray-200 shadow rounded-xl"
        >
          <option value="">اختر المنطقة</option>
          {regions.map((op) => (
            <option value={op.id} key={op.id}>
              {op.name}
            </option>
          ))}
        </select>
      </div>

      {/* زر التعديل */}
      <button
        disabled={loading}
        type="button"
        onClick={handleSubmit}
        className="w-4/12 mt-8 h-10 cursor-pointer rounded-lg bg-blue-950 gap-2 text-white flex items-center justify-center"
      >
        <MdEdit color="white" />
        {loading ? 'جارٍ الحفظ...' : 'حفظ التعديلات'}
      </button>
    </form>
  );
}
