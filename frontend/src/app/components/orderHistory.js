"use client";
import React, { useState } from "react";
import {
  Package,
  ChevronRight,
  Truck,
  CircleCheck,
  Eye,
  MapPin,
} from "lucide-react";

// --- MOCK DATA (Unchanged) ---
const arrivingOrdersData = [
  {
    id: "#ORD-2025-9B3D4",
    status: "In Transit",
    statusIcon: Truck,
    progress: 75,
    datePlaced: "Aug 28, 2025",
    estimatedDelivery: "Sep 2, 2025",
    total: 125.5,
    currentLocation: "Distribution Center, Mumbai",
    items: [
      {
        name: "Modern Glass Table",
        image: "https://picsum.photos/id/1060/100/100",
        quantity: 1,
        price: 125.5,
      },
    ],
  },
];

const pastOrdersData = [
  {
    id: "#ORD-2025-7A1C2",
    status: "Delivered",
    statusIcon: CircleCheck,
    datePlaced: "Jul 15, 2025",
    deliveredOn: "Jul 20, 2025",
    total: 89.99,
    items: [
      {
        name: "Ergonomic Office Chair",
        image: "https://picsum.photos/id/21/100/100",
        quantity: 1,
        price: 69.99,
      },
      {
        name: "Wireless Mouse",
        image: "https://picsum.photos/id/0/100/100",
        quantity: 1,
        price: 20.0,
      },
    ],
  },
  {
    id: "#ORD-2025-5F8E9",
    status: "Delivered",
    statusIcon: CircleCheck,
    datePlaced: "May 02, 2025",
    deliveredOn: "May 08, 2025",
    total: 210.0,
    items: [
      {
        name: "Premium Bookshelf Set",
        image: "https://picsum.photos/id/24/100/100",
        quantity: 2,
        price: 105.0,
      },
    ],
  },
];
// --- END MOCK DATA ---

// A single, reusable card for displaying items within an order
const ItemCard = ({ item }) => (
  <div className="flex items-center gap-4 p-3 rounded-xl bg-white/20 border border-white/30">
    <img
      src={item.image}
      alt={item.name}
      className="w-14 h-14 rounded-lg object-cover border border-white/20"
    />
    <div className="flex-grow min-w-0">
      <p className="font-semibold text-slate-800 truncate">{item.name}</p>
      <div className="flex items-center justify-between mt-1">
        <span className="text-sm text-slate-600">Qty: {item.quantity}</span>
        <span className="text-sm font-semibold text-slate-700">
          ${item.price?.toFixed(2)}
        </span>
      </div>
    </div>
  </div>
);

// Professional card for active, "In Transit" orders
const ActiveOrderCard = ({ order }) => {
  const StatusIcon = order.statusIcon;
  return (
    <div className="backdrop-blur-md bg-white/25 rounded-2xl border border-white/30 shadow-xl p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-blue-500/20 border border-blue-500/30">
            <StatusIcon className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">{order.status}</h3>
            <p className="text-slate-600 font-medium">
              Expected: {order.estimatedDelivery}
            </p>
          </div>
        </div>
        <div className="text-sm text-slate-700 text-left sm:text-right">
          <p className="font-mono">{order.id}</p>
          <p>Placed on {order.datePlaced}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold text-slate-700">Delivery Progress</h4>
          <span className="text-sm font-bold text-blue-600">
            {order.progress}%
          </span>
        </div>
        <div className="w-full h-2 bg-white/30 rounded-full border border-white/30">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-1000"
            style={{ width: `${order.progress}%` }}
          ></div>
        </div>
        <div className="flex items-center gap-2 mt-2 text-sm text-slate-600">
          <MapPin className="w-4 h-4" />
          <span>{order.currentLocation}</span>
        </div>
      </div>

      {/* Items */}
      <div className="space-y-3 pt-4 border-t border-white/30">
        <h4 className="font-semibold text-slate-700 mb-2">
          Items in this order
        </h4>
        {order.items.map((item, index) => (
          <ItemCard key={index} item={item} />
        ))}
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pt-4 border-t border-white/30">
        <p className="font-bold text-xl text-slate-800">
          Total: ${order.total.toFixed(2)}
        </p>
        <button className="flex items-center justify-center gap-2 px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg w-full sm:w-auto">
          <Eye className="w-5 h-5" />
          <span>Track Package</span>
        </button>
      </div>
    </div>
  );
};

// Compact, expandable card for past, "Delivered" orders
const PastOrderCard = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const StatusIcon = order.statusIcon;

  return (
    <div className="backdrop-blur-md bg-white/25 rounded-2xl border border-white/30 shadow-xl p-5 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-lg bg-green-500/20 border border-green-500/30">
            <StatusIcon className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">{order.status}</h3>
            <p className="text-sm text-slate-600">On {order.deliveredOn}</p>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 rounded-full bg-white/30 hover:bg-white/50 border border-white/30 transition-all duration-200"
        >
          <ChevronRight
            className={`w-5 h-5 text-slate-600 transition-transform duration-300 ${
              isExpanded ? "rotate-90" : ""
            }`}
          />
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isExpanded ? "max-h-96 mt-5" : "max-h-0"
        }`}
      >
        <div className="space-y-3 pt-4 border-t border-white/30">
          <h4 className="font-semibold text-slate-700 text-sm mb-2">
            Items from this order:
          </h4>
          {order.items.map((item, index) => (
            <ItemCard key={index} item={item} />
          ))}
          <div className="flex justify-between items-center pt-3 mt-3 border-t border-white/30">
            <span className="text-sm text-slate-600 font-mono">{order.id}</span>
            <span className="font-bold text-lg text-slate-800">
              ${order.total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple placeholder for when no orders are found
const EmptyState = ({ title, description }) => (
  <div className="backdrop-blur-md bg-white/25 rounded-2xl border border-white/30 shadow-xl p-8 text-center">
    <Package className="w-12 h-12 mx-auto text-slate-500 mb-4" />
    <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
    <p className="text-slate-600 mt-2">{description}</p>
  </div>
);

// Main component, structured to fit inside a tab
const OrderHistory = () => {
  return (
    <div className="space-y-12">
      {/* Active Orders Section */}
      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Active Orders
        </h2>
        {arrivingOrdersData.length > 0 ? (
          <div className="space-y-6">
            {arrivingOrdersData.map((order) => (
              <ActiveOrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Active Orders"
            description="You don't have any orders on the way right now."
          />
        )}
      </section>

      {/* Order History Section */}
      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Past Orders</h2>
        {pastOrdersData.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-2">
            {pastOrdersData.map((order) => (
              <PastOrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Past Orders"
            description="Your order history is empty. Start shopping to see your orders here!"
          />
        )}
      </section>
    </div>
  );
};

export default OrderHistory;
