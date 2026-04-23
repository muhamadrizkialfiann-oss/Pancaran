/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Truck, 
  PlusCircle, 
  Settings, 
  LogOut, 
  Search, 
  ChevronRight, 
  Package, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ShieldCheck,
  ShieldAlert,
  FileWarning,
  TrendingUp,
  Filter,
  Download,
  Calendar,
  Layers,
  Activity,
  Users,
  BarChart2,
  Map,
  ShoppingBag,
  Handshake,
  Star,
  PieChart as PieIcon,
  TrendingDown,
  Menu,
  X,
  Plus,
  Trash2,
  Edit2,
  Save,
  FileSpreadsheet,
  RefreshCw,
  User as UserIcon,
  Settings2,
  Ship,
  Warehouse,
  Cpu,
  Globe,
  Anchor,
  Database,
  Github
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  LineChart,
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie,
  AreaChart,
  Area
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  GithubAuthProvider,
  onAuthStateChanged, 
  signOut,
  type User as FirebaseUser 
} from 'firebase/auth';
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  doc, 
  updateDoc, 
  deleteDoc,
  getDocFromServer
} from 'firebase/firestore';
import { db, auth, googleProvider, githubProvider } from './firebase';
import { Shipment } from './types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const LANGUAGES = {
  id: {
    dashboard: "Dashboard",
    inputData: "Input Data",
    manageFleet: "Kelola Armada",
    logout: "Keluar",
    opsDashboard: "Dashboard Operasional",
    globalOverview: "Dasbor Gambaran Logistik Global",
    totalShipments: "Total Pengiriman",
    activeFleet: "Armada Aktif",
    totalCosts: "Total Biaya Logistik",
    mapIndonesia: "Live Tracking Map Indonesia",
    currentOrderStatus: "Status Pesanan Saat Ini",
    pickedUp: "Penjemputan",
    inTransitLabel: "Dalam Transit",
    atDestination: "Sampai Tujuan",
    volTrend: "Tren Volume Pengiriman",
    top3Vendors: "Top 3 Vendor Logistik",
    opsPerformance: "Dasbor Kinerja Operasional Logistik",
    lastUpdated: "Terakhir Diperbarui",
    perfSummary: "Ringkasan Kinerja Logistik",
    otd: "On-Time Delivery (OTD)",
    perfectOrder: "Perfect Order Rate",
    costPerKm: "Cost Per Kilometer",
    accidents: "Accident Incidents",
    noIncidents: "Nol Insiden",
    deliveryPerf: "Performa Pengiriman",
    orderCycleTime: "Rata-rata Order Cycle Time",
    transitTime: "Rata-rata Transit Time",
    delayCauses: "Penyebab Keterlambatan",
    traffic: "Macet",
    weather: "Cuaca",
    qualityReliability: "Kualitas & Keandalan",
    orderAccuracy: "Akurasi Pesanan",
    damageFree: "Pengiriman Bebas Kerusakan",
    claimsRate: "Tingkat Klaim Barang Rusak",
    costEfficiency: "Efisiensi Biaya",
    fuelConsumption: "Konsumsi BBM per KM",
    opsCostDist: "Distribusi Biaya Operasional",
    fleetAssetMgmt: "Manajemen Aset & Armada",
    utilizationRate: "Pemanfaatan Kapasitas Truk",
    emptyMiles: "Empty Miles (Jarak Kosong)",
    vehicleDowntime: "Vehicle Downtime (Waktu Tidak Beroperasi)",
    fleetTracking: "Pelacakan Armada Terkini",
    fleetCenter: "Pusat komando pemantauan armada",
    lastSync: "Sinkronisasi Terakhir",
    autoSync: "Auto-Sinkron Aktif",
    startSync: "Mulai Sinkron ke Sheet",
    totalArmada: "Total Armada",
    waiting: "Menunggu",
    inTransit: "Dalam Perjalanan",
    delivered: "Terkirim",
    distStatus: "Distribusi Status Armada",
    recentTrans: "Transaksi Database Terbaru",
    noActivity: "Belum ada aktivitas tercatat",
    dataEntry: "Input Data Firebase",
    step: "Langkah",
    manifest: "Nomor Manifest",
    consignee: "Nama Penerima",
    origin: "Hub Asal",
    destination: "Tujuan",
    category: "Kategori B-Type",
    status: "Status Awal",
    customAttrs: "Atribut Kustom (B-Type)",
    addColumn: "TAMBAH KOLOM",
    pushData: "Kirim ke Produksi (Firebase)",
    editArmada: "Edit rincian manifest logistik",
    search: "Cari plat nomor atau driver...",
    save: "Simpan",
    cancel: "Batal",
    delete: "Hapus",
    fieldPlaceholder: "e.g. prioritas",
    valPlaceholder: "e.g. Tinggi",
    fieldName: "Nama Field",
    value: "Nilai",
    confirmDeleteField: "Apakah Anda yakin ingin menghapus field kustom ini secara permanen?",
    databaseHub: "Pusat Database",
    actions: "Aksi",
    opsContext: "Konteks Operasional",
    dynSchema: "Konfigurasi Skema Dinamis",
    liveUpdate: "Pembaruan Langsung",
    addField: "+ TAMBAH FIELD",
    confirmDeleteArmada: "Hapus data armada ini?",
    syncInfo: "Info Sinkron",
    language: "Bahasa",
    profile: "Profil",
    filter: "Filter",
    compliance: "Compliance",
    resource: "Resource & Armada",
    procurement: "Logistik & Pengadaan",
    performance: "Performa Operasional",
    overview: "Gambaran Global",
    procurementOverview: "Ikhtisar Procurement Logistik",
    procurementSpend: "Total Pengeluaran Pengadaan",
    onTimeDelivery: "Ketepatan Waktu Pengiriman",
    vendorSatisfaction: "Nilai Kepuasan Vendor",
    keyVendorAnalysis: "Analisis Vendor Utama",
    procDocumentStatus: "Status Dokumen Procurement",
    opsCosts: "Biaya Operasional Logistik",
    costDistribution: "Distribusi Biaya",
    trendCostKm: "Tren Biaya Per Kilometer",
    additionalCosts: "Komponen Biaya Tambahan",
    slaScore: "Skor SLA",
    fleetCount: "Armada",
    coverage: "Jangkauan",
    rfqFlow: "Alur RFQ & Kontrak",
    rfiCreation: "Pembuatan RFI",
    rfqIssuance: "Penerbitan RFQ",
    ongoingEval: "Evaluasi Berlangsung",
    contractSigning: "Penandatanganan SLA & Kontrak",
    slaRequirements: "Ketentuan SLA Utama",
    vendorResponse: "Respon Vendor <2 Jam",
    loadingTime: "Waktu Bongkar Muat <3 Jam",
    gpsAvail: "Ketersediaan GPS",
    transport: "Transportasi",
    warehousing: "Pergudangan",
    handling: "Penanganan Barang",
    admin: "Administrasi & Lainnya",
    tollFees: "Uang Jalan Tol",
    loadingFees: "Biaya Bongkar Muat",
    waitingFees: "Uang Tunggu",
    insurance: "Asuransi",
    monitoringResource: "Dashboard Monitoring Resource & Armada",
    summaryStatus: "Ringkasan Status Armada (Global Counters)",
    totalReady: "Total Armada Ready",
    totalInTransit: "Total In-Transit",
    maintenanceBreakdown: "Maintenance / Breakdown",
    remainingCapacity: "Sisa Kapasitas (In-Transit)",
    unitDetails: "Daftar Detail Unit & Status Real-Time",
    mapView: "Map View (Live Position)",
    topVendor: "Top Vendor Performance (Availability)",
    standbyPool: "Standby di Pool",
    actionRequired: "Action Required",
    remaining: "Tersisa",
    tonnage: "Tonase",
    volume: "Kubikasi",
    routeEta: "Rute/ETA/Lokasi",
    action: "Tindakan",
    truckType: "Tipe Truck",
    fleetCompliance: "Kepatuhan Armada",
    expiredDocs: "Dokumen Kedaluwarsa",
    upcomingExp: "Kedaluwarsa Mendatang",
    driverReadiness: "Kesiapan Driver",
    complianceRate: "Tingkat Kepatuhan",
    criticalAlerts: "Peringatan Kritis (Resiko Tinggi)",
    masterFleetTable: "Tabel Kepatuhan Armada Master",
    expTimeline: "Timeline Kedaluwarsa (6 Bulan Ke Depan)",
    driverLicenseStatus: "Status SIM Driver (Top 5 Risiko)",
    vendorCorpDocs: "Dokumen Korporat Vendor",
    addDoc: "+ Tambah Dokumen Baru",
    exportReport: "Ekspor Laporan",
    period: "Periode",
    allAreas: "Semua Area",
    allVendors: "Semua Vendor",
    unitId: "ID Unit",
    exportMaster: "Ekspor Master Data",
    exportDesc: "Tarik semua data dummy logistik menjadi satu sumber data master untuk pelaporan eksternal.",
    downloadCsv: "Download CSV Master",
    dataUnified: "Sumber Data Terpadu",
    expStnk: "Exp. STNK",
    expKir: "Exp. KIR",
    driverName: "Nama Driver",
    simType: "Tipe SIM",
    vendorName: "Nama Vendor",
    statusLabel: "Status",
    stock: "Stok",
    onDuty: "On Duty",
    offDuty: "Off Duty",
    percentage: "Persentase",
    truckTypeBreakdown: "Rincian Stok Per Tipe Truk",
    signInGoogle: "Masuk dengan Google",
    signInGithub: "Masuk dengan GitHub",
    portalLogin: "PORTAL LOGIN",
    securedData: "Infrastruktur Data Terjamin",
    encrypted: "Terenkripsi",
    networkActive: "Jaringan Aktif",
    initializing: "Memulai Sistem",
    connecting: "Menghubungkan...",
    authError: "Gagal masuk. Silakan periksa koneksi atau coba lagi.",
    popupBlocked: "Popup diblokir oleh browser. Silakan izinkan popup untuk login.",
    unauthorizedDomain: "Domain ini belum diizinkan untuk login di Firebase.",
    enterSystem: "MASUK KE SISTEM",
    systemReady: "Sistem Siap Digunakan",
    accessDesc: "Klik tombol di atas untuk akses instan tanpa akun."
  },
  en: {
    dashboard: "Dashboard",
    inputData: "Input Data",
    manageFleet: "Manage Fleet",
    logout: "Logout",
    opsDashboard: "Operations Dashboard",
    fleetCenter: "Fleet monitoring command center",
    lastSync: "Last Sync",
    autoSync: "Auto-Sync Active",
    startSync: "Start Sync to Sheet",
    totalArmada: "Total Fleet",
    waiting: "Pending",
    inTransit: "In Transit",
    delivered: "Delivered",
    distStatus: "Fleet Status Distribution",
    recentTrans: "Recent Database Transactions",
    noActivity: "No activity recorded yet",
    dataEntry: "Firebase Data Entry",
    step: "Step",
    manifest: "Manifest Number",
    consignee: "Consignee Name",
    origin: "Origin Hub",
    destination: "Destination",
    category: "B-Type Category",
    status: "Initial Status",
    customAttrs: "Custom Attributes (B-Type)",
    addColumn: "ADD COLUMN",
    pushData: "Push to Production (Firebase)",
    editArmada: "Edit logistics manifest details",
    search: "Search plate or driver...",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    fieldPlaceholder: "e.g. priority",
    valPlaceholder: "e.g. High",
    fieldName: "Field Name",
    value: "Value",
    confirmDeleteField: "Are you sure you want to permanently delete this custom field?",
    databaseHub: "Database Hub",
    actions: "Actions",
    opsContext: "Operations Context",
    dynSchema: "Dynamic Schema Config",
    liveUpdate: "Live Update",
    addField: "+ ADD FIELD",
    confirmDeleteArmada: "Delete this fleet data?",
    syncInfo: "Sync Info",
    language: "Language",
    profile: "Profile",
    filter: "Filter",
    compliance: "Compliance",
    resource: "Resource & Fleet",
    procurement: "Logistics & Procurement",
    performance: "Operational Performance",
    overview: "Global Overview",
    procurementOverview: "Logistics Procurement Overview",
    procurementSpend: "Total Procurement Spend",
    onTimeDelivery: "On-Time Delivery Rate",
    vendorSatisfaction: "Vendor Satisfaction Score",
    keyVendorAnalysis: "Key Vendor Analysis",
    procDocumentStatus: "Procurement Document Status",
    opsCosts: "Logistics Operational Costs",
    costDistribution: "Cost Distribution",
    trendCostKm: "Cost Per Kilometer Trend",
    additionalCosts: "Additional Cost Components",
    slaScore: "SLA Score",
    fleetCount: "Fleet",
    coverage: "Coverage",
    rfqFlow: "RFQ & Contract Flow",
    rfiCreation: "RFI Creation",
    rfqIssuance: "RFQ Issuance",
    ongoingEval: "Ongoing Evaluation",
    contractSigning: "SLA & Contract Signing",
    slaRequirements: "Key SLA Requirements",
    vendorResponse: "Vendor Response <2 Hours",
    loadingTime: "Loading/Unloading <3 Hours",
    gpsAvail: "GPS Availability",
    transport: "Transportation",
    warehousing: "Warehousing",
    handling: "Material Handling",
    admin: "Admin & Others",
    tollFees: "Toll Fees",
    loadingFees: "Loading/Unloading Fees",
    waitingFees: "Waiting Fees",
    insurance: "Insurance",
    monitoringResource: "Resource & Fleet Monitoring Dashboard",
    summaryStatus: "Fleet Status Summary (Global Counters)",
    totalReady: "Total Ready Fleet",
    totalInTransit: "Total In-Transit",
    maintenanceBreakdown: "Maintenance / Breakdown",
    remainingCapacity: "Remaining Capacity (In-Transit)",
    unitDetails: "Unit Details & Real-Time Status",
    mapView: "Map View (Live Position)",
    topVendor: "Top Vendor Performance (Availability)",
    standbyPool: "Standby at Pool",
    actionRequired: "Action Required",
    remaining: "Remaining",
    tonnage: "Tonnage",
    volume: "Volume",
    routeEta: "Route/ETA/Location",
    action: "Action",
    truckType: "Truck Type",
    fleetCompliance: "Fleet Compliance",
    expiredDocs: "Expired Documents",
    upcomingExp: "Upcoming Expiration",
    driverReadiness: "Driver Readiness",
    complianceRate: "Compliance Rate",
    criticalAlerts: "Critical Alerts (High Risk)",
    masterFleetTable: "Master Fleet Compliance Table",
    expTimeline: "Expiration Timeline (Next 6 Months)",
    driverLicenseStatus: "Driver License Status (Top 5 Risks)",
    vendorCorpDocs: "Vendor Corporate Documents",
    addDoc: "+ Add New Doc",
    exportReport: "Export Report",
    period: "Period",
    allAreas: "All Areas",
    allVendors: "All Vendors",
    unitId: "Unit ID",
    expStnk: "Exp. STNK",
    expKir: "Exp. KIR",
    driverName: "Driver Name",
    simType: "SIM Type",
    vendorName: "Vendor Name",
    statusLabel: "Status",
    exportMaster: "Export Master Data",
    exportDesc: "Pull all dummy logistics data into a single master data source for external reporting.",
    downloadCsv: "Download Master CSV",
    dataUnified: "Unified Data Source",
    stock: "Stock",
    onDuty: "On Duty",
    offDuty: "Off Duty",
    percentage: "Percentage",
    truckTypeBreakdown: "Truck Type Stock Breakdown",
    signInGoogle: "Sign In with Google",
    signInGithub: "Sign In with GitHub",
    portalLogin: "PORTAL LOGIN",
    securedData: "Secured Data Infrastructure",
    encrypted: "Encrypted",
    networkActive: "Network Active",
    initializing: "Initializing Systems",
    connecting: "Connecting...",
    authError: "Login failed. Please check your connection or try again.",
    popupBlocked: "Popup was blocked by the browser. Please allow popups to login.",
    unauthorizedDomain: "This domain is not authorized for login in Firebase.",
    enterSystem: "ENTER SYSTEM",
    systemReady: "System Ready for Access",
    accessDesc: "Click the button above for instant access without an account."
  }
};

const MASTER_DATA_SOURCE = {
  overview: {
    volTrend: [
      { name: 'JAN', vol: 1500, otd: 94 },
      { name: 'FEB', vol: 1800, otd: 95 },
      { name: 'MAR', vol: 1600, otd: 96 },
      { name: 'APR', vol: 1900, otd: 95 },
      { name: 'MEI', vol: 2100, otd: 97 },
      { name: 'JUN', vol: 2000, otd: 96 },
      { name: 'JUL', vol: 2300, otd: 98 },
      { name: 'AGS', vol: 2150, otd: 97 },
      { name: 'SEP', vol: 2400, otd: 98 },
      { name: 'OKT', vol: 2500, otd: 97.1 },
      { name: 'NOV', vol: 2600, otd: 98 },
      { name: 'DES', vol: 2750, otd: 99 },
    ],
    vendors: [
      { name: 'VENDOR A', orders: '1,800', cost: 'Biaya Terendah', sla: '98%' },
      { name: 'VENDOR B', orders: '1,500', cost: 'Jangkauan Luas', sla: '97%' },
      { name: 'VENDOR C', orders: '1,100', cost: 'Pengiriman Khusus', sla: '96%' },
    ],
    metrics: {
      totalShipments: "5,400",
      otd: 97.1,
      activeFleet: 45,
      totalFleet: 50,
      totalCosts: "Rp 1.2 Milyar"
    }
  },
  performance: {
    otdTarget: 98,
    otdValue: 98.1,
    perfectOrderTarget: 96,
    perfectOrderValue: 95.8,
    costPerKm: 12400,
    cycleTime: [
      { name: 'Jul', value: 4.2 },
      { name: 'Agu', value: 4.1 },
      { name: 'Sep', value: 4.2 },
    ],
    transitTime: [
      { name: 'Jul', value: 1.95 },
      { name: 'Agu', value: 1.85 },
      { name: 'Sep', value: 1.80 },
    ],
    delayCauses: [
      { name: 'Traffic', value: 45, color: '#00AEEF' },
      { name: 'Weather', value: 20, color: '#22C55E' },
      { name: 'Others', value: 35, color: '#F97316' },
    ],
    claimsRate: [
      { name: 'Jul', value: 0.8 },
      { name: 'Agu', value: 0.7 },
      { name: 'Sep', value: 0.85 },
    ],
    fuelEfficiency: [
      { name: 'Jul', value: 0.95 },
      { name: 'Agu', value: 1.05 },
      { name: 'Sep', value: 1.25 },
    ],
    costDist: [
      { name: 'BBM', value: 35, color: '#00AEEF' },
      { name: 'Maintenance', value: 25, color: '#001A5E' },
      { name: 'Gaji', value: 20, color: '#22C55E' },
      { name: 'Others', value: 20, color: '#F97316' },
    ],
    costTrend: [
      { name: 'Jul', cost: 12100 },
      { name: 'Agu', cost: 12250 },
      { name: 'Sep', cost: 12400 },
    ]
  },
  procurement: {
    spend: "Rp 8.4 Milyar",
    otd: 98.1,
    satisfaction: 4.6,
    vendors: [
      { name: 'Vendor A', sla: '99%', fleet: '120', coverage: 'JABODETABEK', volumes: [65, 45, 75, 40] },
      { name: 'Vendor B', sla: '97%', fleet: '85', coverage: 'JAWA-BALI', volumes: [45, 65, 45, 85] },
      { name: 'Vendor C', sla: '95%', fleet: '60', coverage: 'SUMATERA', volumes: [35, 75, 55, 65] },
    ],
    costDist: [
      { name: 'Transport', value: 58, color: '#00AEEF' },
      { name: 'Warehousing', value: 22, color: '#001A5E' },
      { name: 'Handling', value: 12, color: '#22C55E' },
      { name: 'Admin', value: 8, color: '#FACC15' },
    ],
    additionalCosts: [
      { name: 'Toll Fees', value: 35, color: '#001A5E' },
      { name: 'Loading', value: 28, color: '#00AEEF' },
      { name: 'Waiting', value: 18, color: '#22C55E' },
      { name: 'Insurance', value: 19, color: '#FACC15' },
    ],
    monthlyCost: [
      { name: 'Juli', cost: 820 },
      { name: 'Agust', cost: 940 },
      { name: 'September', cost: 880 },
    ]
  },
  resource: {
    fleet: [
      { id: 'B 9001 PGC', type: 'Wingbox', vendor: 'PT ABC Logistik', status: 'Ready', area: 'JKT - Marunda', route: 'Standby di Pool A', driver: 'Ahmad F.' },
      { id: 'L 1234 XY', type: 'Tronton', vendor: 'PT Jaya Trans', status: 'In-Transit', area: 'JKT - SBY', route: 'Km 420 (Tol Cipali) | ETA: 18:00', driver: 'Budi S.' },
      { id: 'B 5566 PAA', type: 'CDD', vendor: 'Pancaran Internal', status: 'Ready', area: 'BKS - Cibitung', route: 'Menunggu Muatan', driver: 'Siti R.' },
      { id: 'D 8899 MTR', type: 'Fuso', vendor: 'PT Mitra Transport', status: 'In-Transit', area: 'BDG - JKT', route: 'Bongkar di Gudang B | ETA: 16:30', driver: 'Dedi C.' },
      { id: 'B 9812 PGC', type: 'Trailer', vendor: 'Pancaran Internal', status: 'Maintenance', area: 'BKS - Bekasi', route: 'Pool C (Bengkel)', driver: '-' },
      { id: 'L 7788 PAA', type: 'Wingbox', vendor: 'PT ABC Logistik', status: 'In-Transit', area: 'SBY - JKT', route: 'Km 150 (Tol Japek) | ETA: 22:00', driver: 'Citra D.' },
    ],
    performance: [
      { name: 'PT ABC Logistik', value: 95 },
      { name: 'PT Jaya Trans', value: 92 },
      { name: 'Pancaran Internal', value: 90 },
      { name: 'PT Mitra Transport', value: 88 },
    ],
    summaryCount: { ready: 65, transit: 112, maintenance: 18, total: 200 },
    breakdown: [
      { type: 'Wingbox', stock: 50, ready: 20, transit: 25, maintenance: 5, percentage: 40 },
      { type: 'Tronton', stock: 60, ready: 25, transit: 30, maintenance: 5, percentage: 41.6 },
      { type: 'CDD', stock: 35, ready: 10, transit: 20, maintenance: 5, percentage: 28.5 },
      { type: 'Fuso', stock: 30, ready: 5, transit: 22, maintenance: 3, percentage: 16.6 },
      { type: 'Trailer', stock: 25, ready: 5, transit: 15, maintenance: 5, percentage: 20 },
    ]
  },
  compliance: {
    units: [
      { id: 'B 9812 PGC', type: 'Tronton', vendor: 'PT Trans Logistik', area: 'JKT', expStnk: '22 Apr 2026', expKir: '15 Apr 2026', status: 'critical' },
      { id: 'B 1122 PAA', type: 'Wingbox', vendor: 'Pancaran Inter...', area: 'SBY', expStnk: '10 Des 2026', expKir: '05 Jun 2026', status: 'valid' },
      { id: 'D 4455 PGC', type: 'CDE', vendor: 'PT Mitra Sejati', area: 'BKS', expStnk: '01 Mei 2026', expKir: '12 Agu (9D)', status: 'warning' },
      { id: 'L 7788 PGC', type: 'Fuso', vendor: 'Pancaran Inter...', area: 'MDN', expStnk: '18 Okt 2027', expKir: '20 Nov 2026', status: 'valid' },
      { id: 'B 5566 XYZ', type: 'Wingbox', vendor: 'PT Surya Abadi', area: 'JKT', expStnk: '05 Jan 2027', expKir: 'Expired', status: 'critical' },
    ],
    timeline: [
      { name: 'APR', stnk: 28, kir: 28 },
      { name: 'MAY', stnk: 25, kir: 15 },
      { name: 'JUN', stnk: 22, kir: 18 },
      { name: 'JUL', stnk: 18, kir: 12 },
      { name: 'AUG', stnk: 16, kir: 10 },
      { name: 'SEP', stnk: 14, kir: 8 },
    ],
    drivers: [
      { name: 'Budi Santoso', type: 'B2 Umum', date: 'Expired', status: 'red' },
      { name: 'Ahmad Fauzi', type: 'B1 Umum', date: '05 Mei 2026', status: 'yellow' },
      { name: 'Citra Dewi', type: 'A', date: '12 Des 2027', status: 'green' },
    ]
  }
};

function ExportView({ t, githubToken }: { t: any, githubToken: string | null, key?: string }) {
  const downloadMasterData = () => {
    // Flatten MASTER_DATA_SOURCE into a readable CSV-like structure
    let csvContent = "Category,Metric,Value,Additional\n";
    
    MASTER_DATA_SOURCE.overview.vendors.forEach(v => {
      csvContent += `Overview,Vendor Performance,${v.name},${v.sla}|${v.orders}\n`;
    });
    
    MASTER_DATA_SOURCE.resource.fleet.forEach(f => {
      csvContent += `Resource,Fleet,${f.id},${f.type}|${f.vendor}|${f.status}\n`;
    });
    
    MASTER_DATA_SOURCE.procurement.vendors.forEach(v => {
      csvContent += `Procurement,Vendor Analysis,${v.name},${v.sla}|${v.fleet}|${v.coverage}\n`;
    });
    
    MASTER_DATA_SOURCE.compliance.units.forEach(u => {
      csvContent += `Compliance,Unit Legal,${u.id},${u.status}|STNK:${u.expStnk}|KIR:${u.expKir}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Pancaran_MasterData_Unified.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto py-12"
    >
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-blue-400 via-brand-light to-brand-dark" />
        <div className="p-12 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-blue-50 text-brand-dark mb-8 border border-blue-100 shadow-inner">
             <Download size={48} className="animate-bounce" />
          </div>
          <h1 className="text-4xl font-black text-black tracking-tight uppercase mb-4">{t.exportMaster}</h1>
          <p className="text-slate-500 font-bold max-w-lg mx-auto leading-relaxed mb-6">
            {t.exportDesc}
          </p>

          <div className="flex items-center justify-center gap-4 mb-12">
             <div className={cn(
               "flex items-center gap-2 px-4 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all",
               githubToken ? "bg-emerald-50 border-emerald-200 text-emerald-600 shadow-[0_0_15px_rgba(16,185,129,0.1)]" : "bg-slate-50 border-slate-200 text-slate-400"
             )}>
                <Github size={14} />
                {githubToken ? "GitHub Connected" : "GitHub Not Linked"}
             </div>
             <div className="w-[1px] h-4 bg-slate-200" />
             <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-brand-dark text-[10px] font-black uppercase tracking-widest shadow-[0_0_15px_rgba(0,174,239,0.1)]">
                <Database size={14} />
                Firebase Active
             </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-12">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center text-white font-black text-xs">01</div>
                  <h3 className="text-sm font-black text-black uppercase tracking-widest">{t.dataUnified}</h3>
               </div>
               <p className="text-[10px] font-bold text-slate-500 uppercase leading-relaxed">
                  Unified master data storage ready for local export or cloud synchronization.
               </p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-brand-light flex items-center justify-center text-white font-black text-xs">02</div>
                  <h3 className="text-sm font-black text-black uppercase tracking-widest">CSV EXPORT READY</h3>
               </div>
               <p className="text-[10px] font-bold text-slate-500 uppercase leading-relaxed">
                  Generate secure CSV reports for fleet performance and procurement audits.
               </p>
            </div>
          </div>

          <button 
            onClick={downloadMasterData}
            className="group relative inline-flex items-center justify-center px-10 py-6 bg-brand-dark text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all w-full md:w-auto overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-brand-light to-brand-dark opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center gap-3">
              <Database size={24} />
              {t.downloadCsv}
            </span>
          </button>
        </div>
        <div className="bg-slate-50 p-6 flex flex-wrap items-center justify-center gap-8 border-t border-slate-200">
           <div className="flex items-center gap-2 opacity-100 text-brand-dark transition-all">
              <Github size={20} />
              <span className="text-[10px] font-black uppercase tracking-widest">GitHub Repository</span>
           </div>
           <div className="flex items-center gap-2 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-crosshair">
              <Truck size={20} className="text-brand-dark" />
              <span className="text-[10px] font-black uppercase tracking-widest">Fleet Systems</span>
           </div>
           <div className="flex items-center gap-2 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-crosshair">
              <ShoppingBag size={20} className="text-brand-dark" />
              <span className="text-[10px] font-black uppercase tracking-widest">Procurement</span>
           </div>
           <div className="flex items-center gap-2 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-crosshair">
              <ShieldCheck size={20} className="text-brand-dark" />
              <span className="text-[10px] font-black uppercase tracking-widest">Compliance</span>
           </div>
        </div>
      </div>
    </motion.div>
  );
}

const PancaranLogo = ({ size = "md", theme = "dark" }: { size?: "sm" | "md" | "lg", theme?: "light" | "dark" }) => {
  const iconSize = size === "sm" ? 24 : size === "md" ? 40 : 64;
  const textSize = size === "sm" ? "text-sm" : size === "md" ? "text-xl" : "text-3xl";
  
  return (
    <div className={cn("flex items-center gap-3", size === "lg" && "flex-col")}>
      <div 
        style={{ width: iconSize, height: iconSize }} 
        className="relative shrink-0 rounded-lg overflow-hidden bg-white shadow-sm"
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Background Split */}
          <rect width="100" height="100" fill="white" />
          <path d="M0 0H50L40 100H0V0Z" fill="#00AEEF" />
          <path d="M50 0H100V100H40L50 0Z" fill="#001A5E" />
          
          {/* Stylized Bold P */}
          <path 
            fillRule="evenodd" 
            clipRule="evenodd" 
            d="M35 25H55C66.0457 25 75 33.9543 75 45C75 56.0457 66.0457 65 55 65H45V75H35V25ZM45 55H55C60.5228 55 65 50.5228 65 45C65 39.4772 60.5228 35 55 35H45V55Z" 
            fill="white" 
          />
        </svg>
      </div>
      <div className={cn("flex flex-col leading-tight", size === "lg" && "items-center")}>
        <span className={cn(
          "font-black tracking-tighter uppercase", 
          textSize,
          theme === "dark" ? "text-white" : "text-[#001A5E]"
        )}>
          Pancaran
        </span>
        <span className={cn(
          "font-bold tracking-widest uppercase", 
          size === "sm" ? "text-[10px]" : size === "md" ? "text-sm" : "text-xl",
          "text-[#00AEEF]"
        )}>
          Group
        </span>
      </div>
    </div>
  );
};

function LogisticAnimations() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-[#020617]">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-light/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.05]" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #3b82f6 1px, transparent 0)', backgroundSize: '50px 50px' }} />
      
      {/* Moving Data Nodes */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`node-${i}`}
          initial={{ x: Math.random() * 100 + "%", y: "110%", opacity: 0 }}
          animate={{ y: "-10%", opacity: [0, 0.3, 0] }}
          transition={{ repeat: Infinity, duration: 15 + Math.random() * 10, ease: "linear", delay: Math.random() * 10 }}
          className="absolute w-1 h-1 bg-blue-400 rounded-full blur-[1px]"
        />
      ))}

      {/* Slow Moving Fleet Silhouettes */}
      <div className="absolute bottom-[2%] left-0 right-0 h-32 opacity-20">
        <motion.div
          initial={{ x: -200 }}
          animate={{ x: 2000 }}
          transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
          className="absolute bottom-0 text-blue-300"
        >
          <Ship size={120} />
        </motion.div>
        <motion.div
          initial={{ x: 2000 }}
          animate={{ x: -200 }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear", delay: 10 }}
          className="absolute bottom-8 text-slate-400"
        >
          <Truck size={80} className="scale-x-[-1]" />
        </motion.div>
      </div>

      {/* Tech Overlay: Globe Pulse */}
      <div className="absolute -top-20 -right-20 opacity-[0.03]">
        <Globe size={400} className="text-blue-500 animate-[spin_240s_linear_infinite]" />
      </div>
    </div>
  );
}

function LoginScreen({ onEnter, t }: { onEnter: () => void, t: any }) {
  return (
    <div className="min-h-screen relative flex items-center justify-center p-6 overflow-hidden font-sans bg-[#020617] selection:bg-brand-light/30">
      {/* Background Layer with Ken Burns Effect */}
      <motion.div 
        animate={{ 
          scale: [1, 1.05, 1],
          x: [-5, 5, -5],
          y: [-5, 5, -5]
        }}
        transition={{ 
          duration: 30, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="https://pancaran-group.co.id/storage/galleries/March2021/xM2ZfGv2Nf0qgI1S6L1c.jpg" 
          alt="Pancaran Group Logistic Center" 
          className="w-full h-full object-cover"
        />
        {/* Subtle overlay to keep text legible while showing the image clearly */}
        <div className="absolute inset-0 bg-[#001A5E]/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </motion.div>

      {/* Tactical Animations */}
      <LogisticAnimations />

      {/* Main Auth Card */}
      <motion.div 
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[440px]"
      >
        <div className="bg-[#0f172a]/40 backdrop-blur-3xl p-10 rounded-[3.5rem] border border-white/10 shadow-[0_32px_128px_-16px_rgba(0,0,0,1)] flex flex-col items-center relative overflow-hidden group">
          {/* Accent Glows */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-light/5 blur-[100px] -mr-32 -mt-32 rounded-full group-hover:bg-brand-light/10 transition-all duration-[2s]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/5 blur-[100px] -ml-32 -mb-32 rounded-full group-hover:bg-blue-600/10 transition-all duration-[2s]" />
          
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mb-8 relative z-10"
          >
            <PancaranLogo size="md" theme="dark" />
          </motion.div>

          <div className="space-y-4 mb-10 relative z-10 text-center">
            <h1 className="text-2xl font-black text-white uppercase tracking-[0.4em] leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
               {t.portalLogin}
            </h1>
            <div className="flex items-center justify-center gap-3">
               <div className="h-[2px] w-8 bg-gradient-to-r from-transparent to-brand-light/40" />
               <div className="w-1.5 h-1.5 rounded-full bg-brand-light shadow-[0_0_10px_#00AEEF] animate-pulse" />
               <div className="h-[2px] w-8 bg-gradient-to-l from-transparent to-brand-light/40" />
            </div>
            <p className="text-[9px] font-black text-blue-200 uppercase tracking-[0.6em] leading-relaxed opacity-50">
               {t.securedData}
            </p>
          </div>

          <div className="w-full space-y-6 relative z-10">
            <motion.button 
              whileHover={{ scale: 1.02, backgroundColor: "rgba(0, 174, 239, 1)" }}
              whileTap={{ scale: 0.98 }}
              onClick={onEnter}
              className="group relative w-full h-20 bg-brand-light rounded-2xl font-black text-[#001A5E] flex flex-col items-center justify-center transition-all duration-500 shadow-[0_0_40px_-5px_rgba(0,174,239,0.5)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex items-center gap-3 relative z-10">
                <ChevronRight className="group-hover:translate-x-1 transition-transform" size={24} />
                <span className="tracking-[0.2em] text-[14px] uppercase">{t.enterSystem}</span>
              </div>
              <span className="text-[8px] uppercase tracking-[0.2em] opacity-60 mt-1 font-bold group-hover:opacity-100 transition-opacity">
                {t.systemReady}
              </span>
            </motion.button>

            <div className="flex flex-col items-center gap-2">
               <p className="text-[8px] text-white/30 uppercase tracking-[0.3em] text-center max-w-[200px] leading-relaxed">
                  {t.accessDesc}
               </p>
            </div>
          </div>

          <div className="mt-10 flex items-center gap-4 opacity-40 hover:opacity-100 transition-opacity">
             <div className="flex items-center gap-2">
                <ShieldCheck size={12} className="text-brand-light" />
                <span className="text-[8px] font-black text-white uppercase tracking-[0.3em]">{t.encrypted}</span>
             </div>
             <div className="w-[1px] h-3 bg-white/20" />
             <div className="flex items-center gap-2 text-brand-light">
                <Activity size={12} />
                <span className="text-[8px] font-black uppercase tracking-[0.3em]">{t.networkActive}</span>
             </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [googleToken, setGoogleToken] = useState<string | null>(localStorage.getItem('google_token'));
  const [githubToken, setGithubToken] = useState<string | null>(localStorage.getItem('github_token'));
  const [authError, setAuthError] = useState<string | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'dashboard' | 'input' | 'manage' | 'profile' | 'compliance' | 'resource' | 'procurement' | 'performance' | 'export'>('overview');
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [lang, setLang] = useState<'id' | 'en'>('id');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [autoSyncEnabled, setAutoSyncEnabled] = useState(localStorage.getItem('auto_sync') !== 'false');

  const t = LANGUAGES[lang];

  useEffect(() => {
    localStorage.setItem('auto_sync', String(autoSyncEnabled));
  }, [autoSyncEnabled]);

  useEffect(() => {
    if (googleToken) {
      localStorage.setItem('google_token', googleToken);
    } else {
      localStorage.removeItem('google_token');
    }
  }, [googleToken]);

  useEffect(() => {
    if (githubToken) {
      localStorage.setItem('github_token', githubToken);
    } else {
      localStorage.removeItem('github_token');
    }
  }, [githubToken]);

  const handleSyncToSheets = async (isAuto = false) => {
    if (isSyncing || !googleToken) return;

    setIsSyncing(true);
    if (!isAuto) setSyncStatus(null);
    
    try {
      const allKeys = new Set<string>(['truckPlate', 'driverName', 'origin', 'destination', 'type', 'status', 'timestamp']);
      shipments.forEach(s => {
        Object.keys(s).forEach(key => {
          if (key !== 'id') allKeys.add(key);
        });
      });

      const headers = Array.from(allKeys);
      const rows = shipments.map(s => headers.map(h => (s as any)[h] || ''));
      const data = [headers, ...rows];

      const spreadsheetId = '1zJW6qg9WX1d_cV5tI2sS1llEq_Tr3iea8nc4FXpIys4';
      const range = 'Sheet2!A1';
      
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?valueInputOption=USER_ENTERED`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${googleToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ values: data }),
        }
      );

      if (!response.ok) {
        const err = await response.json();
        const errorMessage = err.error?.message || "Failed to sync to Spreadsheet.";
        if (response.status === 401) {
          setGoogleToken(null);
        }
        throw new Error(errorMessage);
      }

      if (!isAuto) setSyncStatus({ type: 'success', message: lang === 'id' ? 'Data berhasil disinkronkan!' : 'Data synced successfully!' });
    } catch (err: any) {
      console.error(err);
      if (!isAuto) setSyncStatus({ type: 'error', message: err.message });
    } finally {
      setIsSyncing(false);
    }
  };

  const loginGoogleForSheets = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken || null;
      if (token) {
        setGoogleToken(token);
        setAutoSyncEnabled(true);
      }
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  };

  // Auto-sync effect: Sync every 2 seconds if enabled and token exists
  useEffect(() => {
    if (!autoSyncEnabled || !googleToken || shipments.length === 0) return;

    const interval = setInterval(() => {
      handleSyncToSheets(true);
    }, 2000);

    return () => clearInterval(interval);
  }, [shipments, autoSyncEnabled, googleToken]);

  // Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
      if (u) {
        testConnection();
      }
    });
    return () => unsubscribe();
  }, []);

  // Fetch Data
  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'shipments'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: Shipment[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Shipment[];
      setShipments(data);
    }, (error) => {
      console.error("Firestore Error:", error);
    });
    return () => unsubscribe();
  }, [user]);

  async function testConnection() {
    try {
      await getDocFromServer(doc(db, '_connection_test_', 'check'));
    } catch (error: any) {
      if (error?.message?.includes('offline')) {
        console.error("Firebase connection check failed. Check config.");
      }
    }
  }

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/spreadsheets');
    setAuthError(null);
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential?.accessToken) {
        setGoogleToken(credential.accessToken);
      }
    } catch (error: any) {
      console.error("Login failed", error);
      if (error.code === 'auth/popup-blocked') {
        setAuthError(t.popupBlocked);
      } else if (error.code === 'auth/unauthorized-domain') {
        setAuthError(t.unauthorizedDomain);
      } else {
        setAuthError(t.authError);
      }
    }
  };

  const handleGithubLogin = async () => {
    setAuthError(null);
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const credential = GithubAuthProvider.credentialFromResult(result);
      if (credential?.accessToken) {
        setGithubToken(credential.accessToken);
      }
    } catch (error: any) {
      console.error("GitHub Login failed", error);
      if (error.code === 'auth/popup-blocked') {
        setAuthError(t.popupBlocked);
      } else if (error.code === 'auth/unauthorized-domain') {
        setAuthError(t.unauthorizedDomain);
      } else {
        setAuthError(t.authError);
      }
    }
  };

  const handleLogout = () => {
    signOut(auth);
    setGoogleToken(null);
    setGithubToken(null);
    setIsGuest(false);
  };

  const handleGuestLogin = () => {
    setIsGuest(true);
    setAuthError(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white text-brand-dark font-sans">
        <div className="text-center">
          <motion.div 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mb-6 inline-block"
          >
            <PancaranLogo size="lg" theme="light" />
          </motion.div>
          <div className="flex flex-col items-center gap-2">
            <RefreshCw className="animate-spin text-brand-light" size={24} />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black mt-4">{t.initializing}...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user && !isGuest) {
    return <LoginScreen onEnter={handleGuestLogin} t={t} />;
  }

  return (
    <div className="min-h-screen bg-app-bg text-text-main flex font-sans">
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-white border-r border-slate-200 transition-all duration-300 flex flex-col z-50 shadow-sm h-screen sticky top-0",
          isSidebarOpen ? "w-60" : "w-20"
        )}
      >
        <div className="p-6 border-b border-slate-200 bg-slate-50/50 shrink-0">
          {isSidebarOpen ? (
            <PancaranLogo size="md" theme="light" />
          ) : (
            <div className="flex justify-center">
              <PancaranLogo size="sm" theme="light" />
            </div>
          )}
        </div>

        <nav className="flex-1 px-3 space-y-1 mt-6 overflow-y-auto overflow-x-hidden custom-scrollbar">
          <NavItem 
            icon={<Globe size={20} />} 
            label={t.overview} 
            active={activeTab === 'overview'} 
            onClick={() => setActiveTab('overview')} 
            isOpen={isSidebarOpen}
          />
          <NavItem 
            icon={<LayoutDashboard size={20} />} 
            label={t.dashboard} 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
            isOpen={isSidebarOpen}
          />
          <NavItem 
            icon={<PlusCircle size={20} />} 
            label={t.inputData} 
            active={activeTab === 'input'} 
            onClick={() => setActiveTab('input')} 
            isOpen={isSidebarOpen}
          />
          <NavItem 
            icon={<ShieldCheck size={20} />} 
            label={t.compliance} 
            active={activeTab === 'compliance'} 
            onClick={() => setActiveTab('compliance')} 
            isOpen={isSidebarOpen}
          />
          <NavItem 
            icon={<Activity size={20} />} 
            label={t.resource} 
            active={activeTab === 'resource'} 
            onClick={() => setActiveTab('resource')} 
            isOpen={isSidebarOpen}
          />
          <NavItem 
            icon={<ShoppingBag size={20} />} 
            label={t.procurement} 
            active={activeTab === 'procurement'} 
            onClick={() => setActiveTab('procurement')} 
            isOpen={isSidebarOpen}
          />
          <NavItem 
            icon={<BarChart2 size={20} />} 
            label={t.performance} 
            active={activeTab === 'performance'} 
            onClick={() => setActiveTab('performance')} 
            isOpen={isSidebarOpen}
          />
          <NavItem 
            icon={<Download size={20} />} 
            label={t.exportMaster} 
            active={activeTab === 'export'} 
            onClick={() => setActiveTab('export')} 
            isOpen={isSidebarOpen}
          />
          <NavItem 
            icon={<Settings size={20} />} 
            label={t.manageFleet} 
            active={activeTab === 'manage'} 
            onClick={() => setActiveTab('manage')} 
            isOpen={isSidebarOpen}
          />
          <NavItem 
            icon={<UserIcon size={20} />} 
            label={t.profile} 
            active={activeTab === 'profile'} 
            onClick={() => setActiveTab('profile')} 
            isOpen={isSidebarOpen}
          />
        </nav>

        <div className="p-4 space-y-2 border-t border-slate-100 shrink-0">
          <div className="flex items-center gap-2 mb-2 px-3">
            <span className="text-[10px] font-black text-black uppercase tracking-widest">{t.language}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 px-2">
            <button 
              onClick={() => setLang('id')}
              className={cn(
                "py-2 rounded-lg text-[10px] font-black transition-all border",
                lang === 'id' ? "bg-brand-dark text-white border-brand-dark shadow-md" : "bg-white text-black border-slate-200 hover:border-slate-300"
              )}
            >
              ID
            </button>
            <button 
              onClick={() => setLang('en')}
              className={cn(
                "py-2 rounded-lg text-[10px] font-black transition-all border",
                lang === 'en' ? "bg-brand-dark text-white border-brand-dark shadow-md" : "bg-white text-black border-slate-200 hover:border-slate-300"
              )}
            >
              EN
            </button>
          </div>
          
          <button 
            onClick={handleLogout}
            className={cn(
              "flex items-center gap-3 w-full p-3 mt-4 rounded-xl text-black font-black hover:bg-red-50 hover:text-red-600 transition-all text-sm",
              !isSidebarOpen && "justify-center"
            )}
          >
            <LogOut size={20} />
            {isSidebarOpen && <span>{t.logout}</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-800 px-8 flex items-center justify-between shadow-sm">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400"
          >
            <Menu size={20} />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="flex gap-1 items-center bg-slate-50 p-1 rounded-lg border border-slate-800 mr-4">
              <button 
                onClick={() => setLang('id')}
                className={cn("px-2 py-1 rounded text-[10px] font-bold", lang === 'id' ? "bg-white text-blue-600 shadow-sm" : "text-slate-900")}
              >
                ID
              </button>
              <button 
                onClick={() => setLang('en')}
                className={cn("px-2 py-1 rounded text-[10px] font-bold", lang === 'en' ? "bg-white text-blue-600 shadow-sm" : "text-slate-900")}
              >
                EN
              </button>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-sm font-black text-black">{user?.displayName || (lang === 'id' ? 'Pengguna Tamu' : 'Guest User')}</p>
              <p className="text-xs text-slate-700 font-medium">{user?.email || 'guest@pancaran.io'}</p>
            </div>
            <img src={user?.photoURL || 'https://ui-avatars.com/api/?name=Guest&background=00AEEF&color=fff'} alt="User" className="w-9 h-9 rounded-full border border-slate-800 shadow-sm" referrerPolicy="no-referrer" />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 relative">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && <OverviewView key="overview" t={t} />}
            {activeTab === 'dashboard' && (
              <DashboardView 
                key="dashboard" 
                shipments={shipments} 
                t={t} 
                isSyncing={isSyncing}
                syncStatus={syncStatus}
                setSyncStatus={setSyncStatus}
                autoSyncEnabled={autoSyncEnabled}
                handleSyncManual={() => googleToken ? handleSyncToSheets(false) : loginGoogleForSheets()}
              />
            )}
            {activeTab === 'input' && <InputView key="input" t={t} lang={lang} onSuccess={() => setActiveTab('dashboard')} />}
            {activeTab === 'manage' && <ManageView key="manage" t={t} shipments={shipments} />}
            {activeTab === 'compliance' && <ComplianceView key="compliance" t={t} />}
            {activeTab === 'resource' && <ResourceView key="resource" t={t} />}
            {activeTab === 'procurement' && <ProcurementView key="procurement" t={t} />}
            {activeTab === 'performance' && <PerformanceView key="performance" t={t} />}
            {activeTab === 'export' && <ExportView key="export" t={t} githubToken={githubToken} />}
            {activeTab === 'profile' && <ProfileEdit t={t} user={user} lang={lang} />}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

// --- Components ---

function Card({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("bg-white rounded-xl shadow-sm border border-slate-200", className)}>
      {children}
    </div>
  );
}

function NavItem({ icon, label, active, onClick, isOpen }: any) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 w-full px-6 py-4 transition-all group relative rounded-xl",
        active 
          ? "bg-slate-100 text-black border-l-4 border-brand-dark" 
          : "text-black hover:bg-slate-50",
        !isOpen && "justify-center"
      )}
    >
      <div className={cn(active ? "text-brand-dark" : "text-black group-hover:text-brand-dark transition-colors")}>
        {icon}
      </div>
      {isOpen && <span className="text-sm font-black whitespace-nowrap">{label}</span>}
    </button>
  );
}

function StatCard({ icon, label, value, color }: any) {
  return (
    <div className="bg-white border border-slate-800 p-5 rounded-lg shadow-sm hover:shadow-md transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className={cn("p-2 rounded-lg transition-transform group-hover:scale-105", color)}>
          {icon}
        </div>
      </div>
      <p className="text-black text-[11px] mb-1 uppercase tracking-wider font-black">{label}</p>
      <div className="flex items-baseline gap-2">
        <h3 className="text-2xl font-black text-brand-dark tracking-tight">{value}</h3>
      </div>
    </div>
  );
}

function OverviewView({ t }: { t: any; key?: string }) {
  const { volTrend, vendors, metrics } = MASTER_DATA_SOURCE.overview;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#0f172a] text-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-800 space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-500/20 rounded-2xl text-blue-400">
            <Globe size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tight">{t.globalOverview}</h1>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
              {t.lastUpdated}: 14:30 WIB | Periode: OKTOBER 2024
            </p>
          </div>
        </div>
      </div>

      {/* Top Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#1e293b] p-6 rounded-3xl border border-slate-700 flex items-center gap-6 group hover:border-blue-500/50 transition-all">
          <div className="p-4 bg-blue-500 text-white rounded-2xl shadow-lg shadow-blue-500/20">
            <Truck size={32} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{t.totalShipments}</p>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black">{metrics.totalShipments}</span>
              <span className="text-[11px] font-black text-emerald-400">↑ 4.2% vs Q2</span>
            </div>
          </div>
        </div>

        <div className="bg-[#1e293b] p-6 rounded-3xl border border-slate-700 flex flex-col justify-center items-center gap-4 group hover:border-emerald-500/50 transition-all">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg"><Clock size={16} /></div>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t.otd}</p>
          </div>
          <div className="relative w-24 h-24 flex items-center justify-center">
             <svg className="w-full h-full transform -rotate-90">
                <circle cx="48" cy="48" r="40" stroke="#0f172a" strokeWidth="8" fill="transparent" />
                <circle cx="48" cy="48" r="40" stroke="#10b981" strokeWidth="8" fill="transparent" strokeDasharray="251.3" strokeDashoffset={251.3 * (1 - metrics.otd / 100)} strokeLinecap="round" className="drop-shadow-[0_0_8px_#10b981]" />
             </svg>
             <span className="absolute text-xl font-black">{metrics.otd}%</span>
          </div>
        </div>

        <div className="bg-[#1e293b] p-6 rounded-3xl border border-slate-700 flex flex-col justify-center gap-4">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg"><Truck size={16} /></div>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t.activeFleet}</p>
          </div>
          <div>
             <div className="flex justify-between items-end mb-2">
                <span className="text-3xl font-black">{metrics.activeFleet} <span className="text-sm text-slate-500">/ {metrics.totalFleet}</span></span>
             </div>
             <div className="w-full h-2 bg-[#0f172a] rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${(metrics.activeFleet / metrics.totalFleet) * 100}%` }} className="h-full bg-emerald-500" />
             </div>
          </div>
        </div>

        <div className="bg-[#1e293b] p-6 rounded-3xl border border-slate-700 flex items-center gap-6">
          <div className="p-4 bg-indigo-500 text-white rounded-2xl">
            <FileSpreadsheet size={32} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{t.totalCosts}</p>
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-black">{metrics.totalCosts}</span>
              <span className="text-[11px] font-black text-red-400">↑ 2.8% vs Q2</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mid Section: Map and Order Status */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Map */}
        <div className="lg:col-span-3 bg-[#1e293b] p-8 rounded-3xl border border-slate-700 relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-8 relative z-10">
             <Globe size={18} className="text-emerald-400" />
             <h2 className="text-xs font-black uppercase tracking-[0.2em]">{t.mapIndonesia}</h2>
          </div>
          <div className="h-[300px] w-full flex items-center justify-center relative">
             <div className="absolute inset-0 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700">
                <Map size={400} className="text-emerald-500/20 mx-auto" />
             </div>
             {/* Hub Labels Overlay */}
             <div className="absolute right-4 top-1/2 -translate-y-1/2 space-y-4">
                {['JAKARTA HUB', 'SURABAYA HUB', 'MEDAN HUB'].map((hub, i) => (
                  <div key={hub} className="bg-[#0f172a]/80 p-3 rounded-xl border border-slate-700 backdrop-blur-md">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <p className="text-[9px] font-black tracking-widest">{hub}</p>
                    </div>
                    <div className="flex gap-4">
                       <div className="h-1 w-12 bg-slate-700 rounded-full overflow-hidden">
                          <div className={cn("h-full bg-emerald-400", i === 0 ? "w-[80%]" : i === 1 ? "w-[60%]" : "w-[40%]")} />
                       </div>
                    </div>
                  </div>
                ))}
             </div>
             {/* Map Markers */}
             <motion.div animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute left-[45%] top-[60%] text-emerald-400 drop-shadow-[0_0_10px_#10b981]"><Truck size={24} /></motion.div>
             <motion.div animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }} className="absolute left-[55%] top-[65%] text-emerald-400 drop-shadow-[0_0_10px_#10b981]"><Truck size={18} /></motion.div>
          </div>
        </div>

        {/* Status Flow */}
        <div className="lg:col-span-2 bg-[#1e293b] p-8 rounded-3xl border border-slate-700 space-y-8">
           <h2 className="text-xs font-black uppercase tracking-[0.2em] border-b border-slate-700 pb-4">{t.currentOrderStatus}</h2>
           
           <div className="relative space-y-4 pt-10">
              <div className="flex items-center font-black">
                 <div className="flex-1 flex flex-col items-center gap-4 relative">
                    <div className="text-[9px] text-slate-400 uppercase tracking-widest mb-6">{t.pickedUp}</div>
                    <div className="relative w-full h-12 bg-[#0f172a] rounded-l-2xl border-l-[12px] border-blue-500 overflow-hidden flex items-center justify-center">
                       <span className="relative z-10 text-xl">20%</span>
                       <div className="absolute right-0 inset-y-0 w-8 bg-[#1e293b] origin-left skew-x-[30deg] translate-x-4 border-l border-slate-700" />
                    </div>
                    <p className="text-[10px] text-blue-400">20%</p>
                 </div>
                 <div className="flex-1 flex flex-col items-center gap-4 relative">
                    <div className="text-[9px] text-slate-400 uppercase tracking-widest mb-6">{t.inTransitLabel}</div>
                    <div className="relative w-full h-12 bg-emerald-500 text-white overflow-hidden flex items-center justify-center">
                       <span className="relative z-10 text-xl font-black">50%</span>
                       <div className="absolute right-0 inset-y-0 w-8 bg-emerald-500 origin-left skew-x-[30deg] translate-x-4" />
                       <div className="absolute left-0 inset-y-0 w-8 bg-[#0f172a] origin-left skew-x-[30deg] -translate-x-4" />
                    </div>
                    <p className="text-[10px] text-emerald-400">50%</p>
                 </div>
                 <div className="flex-1 flex flex-col items-center gap-4 relative">
                    <div className="text-[9px] text-slate-400 uppercase tracking-widest mb-6">{t.atDestination}</div>
                    <div className="relative w-full h-12 bg-[#0f172a] overflow-hidden flex items-center justify-center border-l border-slate-700">
                       <span className="relative z-10 text-xl">20%</span>
                       <div className="absolute right-0 inset-y-0 w-8 bg-[#1e293b] origin-left skew-x-[30deg] translate-x-4 border-l border-slate-700" />
                       <div className="absolute left-0 inset-y-0 w-8 bg-emerald-500 origin-left skew-x-[30deg] -translate-x-4" />
                    </div>
                    <p className="text-[10px] text-slate-500">20%</p>
                 </div>
                 <div className="flex-1 flex flex-col items-center gap-4 relative">
                    <div className="text-[9px] text-slate-400 uppercase tracking-widest mb-6">{t.delivered}</div>
                    <div className="relative w-full h-12 bg-emerald-900/50 rounded-r-2xl border-r-[12px] border-emerald-500 overflow-hidden flex items-center justify-center">
                       <span className="relative z-10 text-xl text-emerald-400">10%</span>
                       <div className="absolute left-0 inset-y-0 w-8 bg-[#0f172a] origin-left skew-x-[30deg] -translate-x-4 border-r border-slate-700" />
                    </div>
                    <p className="text-[10px] text-emerald-500">10%</p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Bottom Section: Trend and Vendors */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 bg-[#1e293b] p-8 rounded-3xl border border-slate-700">
           <div className="flex items-center justify-between mb-8">
              <h2 className="text-xs font-black uppercase tracking-[0.2em]">{t.volTrend}</h2>
              <div className="flex gap-4 items-center">
                 <div className="flex items-center gap-2 text-[9px] font-black uppercase"><div className="w-3 h-3 bg-emerald-500 rounded-sm" /> Total</div>
                 <div className="flex items-center gap-2 text-[9px] font-black uppercase"><div className="w-3 h-[2px] bg-white rounded-full" /> OTD</div>
              </div>
           </div>
           <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={volTrend}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 900 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 900 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }} />
                    <Bar dataKey="vol" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Line type="monotone" dataKey="otd" stroke="#ffffff" strokeWidth={3} dot={{ fill: '#ffffff', strokeWidth: 2, r: 4 }} />
                 </BarChart>
              </ResponsiveContainer>
           </div>
        </div>

        <div className="lg:col-span-2 bg-[#1e293b] p-8 rounded-3xl border border-slate-700">
           <h2 className="text-xs font-black uppercase tracking-[0.2em] mb-8">{t.top3Vendors}</h2>
           <div className="space-y-4">
              <div className="grid grid-cols-4 px-4 text-[9px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-700 pb-2">
                 <div className="col-span-2">Vendor</div>
                 <div>Pesanan</div>
                 <div className="text-right">SLA</div>
              </div>
              {vendors.map((v: any, i: number) => (
                <div key={i} className="grid grid-cols-4 items-center p-4 rounded-2xl bg-[#0f172a]/50 border border-slate-800 hover:border-slate-700 transition-all">
                   <div className="col-span-2 flex items-center gap-4">
                      <div className="p-2 bg-[#1e293b] rounded-xl flex items-center justify-center">
                         {i === 0 ? <UserIcon size={20} className="text-orange-500" /> : i === 1 ? <Ship size={20} className="text-blue-500" /> : <Package size={20} className="text-orange-600" />}
                      </div>
                      <div>
                         <p className="text-[11px] font-black">{v.name}</p>
                         <p className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">{v.cost}</p>
                      </div>
                   </div>
                   <div className="text-sm font-black">{v.orders}</div>
                   <div className="text-right">
                      <p className="text-emerald-400 font-black">{v.sla}</p>
                      <div className="flex gap-0.5 justify-end mt-1">
                         {[...Array(5)].map((_, j) => (
                           <div key={j} className={cn("inline-block w-1 rounded-full", j < 4-i ? "h-3 bg-emerald-500" : "h-2 bg-slate-700")} />
                         ))}
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </motion.div>
  );
}

function DashboardView({ 
  shipments, 
  t, 
  isSyncing, 
  syncStatus, 
  setSyncStatus, 
  autoSyncEnabled, 
  handleSyncManual 
}: { 
  shipments: Shipment[]; 
  t: any; 
  isSyncing: boolean;
  syncStatus: any;
  setSyncStatus: any;
  autoSyncEnabled: boolean;
  handleSyncManual: () => void;
  key?: string 
}) {
  const stats = {
    total: shipments.length,
    pending: shipments.filter(s => s.status === 'Pending').length,
    inTransit: shipments.filter(s => s.status === 'In Transit').length,
    delivered: shipments.filter(s => s.status === 'Delivered').length,
  };

  const chartData = [
    { name: t.waiting, count: stats.pending, fill: '#64748b' },
    { name: t.inTransit, count: stats.inTransit, fill: '#3b82f6' },
    { name: t.delivered, count: stats.delivered, fill: '#22c55e' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-brand-dark tracking-tight">{t.opsDashboard}</h2>
          <p className="text-black text-xs font-bold">{t.fleetCenter}</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleSyncManual}
            disabled={isSyncing}
            className={cn(
              "btn flex items-center gap-2",
              autoSyncEnabled ? "bg-green-100 text-green-700 border border-green-200" : "bg-green-500 text-white hover:bg-green-600 shadow-sm"
            )}
          >
            {isSyncing ? <RefreshCw size={14} className="animate-spin" /> : <FileSpreadsheet size={14} />}
            <span className="text-[10px] uppercase tracking-widest font-bold">
              {autoSyncEnabled ? `${t.autoSync} (Live)` : t.startSync}
            </span>
          </button>
          <div className="flex items-center gap-2 text-[10px] text-black bg-white px-4 py-2 rounded-lg border border-slate-200 uppercase tracking-widest font-black shadow-sm">
            <Clock size={12} className="text-brand-light" />
            {t.lastSync}: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>

      {syncStatus && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={cn(
            "p-3 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center justify-between",
            syncStatus.type === 'success' ? "bg-green-100 text-green-700 border border-green-200" : "bg-red-100 text-red-700 border border-red-200"
          )}
        >
          <span>{syncStatus.message}</span>
          <button onClick={() => setSyncStatus(null)} className="ml-4 opacity-50 hover:opacity-100">
            <X size={14} />
          </button>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<Package />} label={t.totalArmada} value={stats.total} color="bg-blue-500/10 text-blue-500" />
        <StatCard icon={<AlertCircle />} label={t.waiting} value={stats.pending} color="bg-slate-500/10 text-slate-400" />
        <StatCard icon={<Clock />} label={t.inTransit} value={stats.inTransit} color="bg-blue-600/10 text-blue-400" />
        <StatCard icon={<CheckCircle2 />} label={t.delivered} value={stats.delivered} color="bg-green-500/10 text-green-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-slate-200 p-8 rounded-lg h-[400px] shadow-sm">
          <h3 className="text-xs font-black uppercase tracking-wider text-black mb-6">{t.distStatus}</h3>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="name" stroke="#7f8c8d" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#7f8c8d" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ background: '#ffffff', border: '1px solid #dcdde1', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                itemStyle={{ color: '#2c3e50' }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={40}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-slate-200 p-8 rounded-lg shadow-sm">
          <h3 className="text-xs font-black uppercase tracking-wider text-black mb-6">{t.recentTrans}</h3>
          <div className="space-y-6">
            {shipments.slice(0, 4).map((s, i) => (
              <div key={s.id} className="flex gap-4 group cursor-default items-center">
                <div className={cn(
                   "w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border border-slate-200",
                  s.status === 'Delivered' ? "bg-green-500/10 text-green-500" : 
                  s.status === 'In Transit' ? "bg-brand-light/10 text-brand-light" : "bg-slate-100 text-slate-800"
                )}>
                  <Truck size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center bg-slate-50 p-3 rounded rounded-lg border border-slate-200">
                    <h4 className="font-black text-black text-xs truncate">{s.truckPlate}</h4>
                    <span className="text-[10px] text-black font-mono font-bold">
                      {new Date(s.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {shipments.length === 0 && (
              <p className="text-black text-center py-12 text-sm font-bold italic">{t.noActivity}</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function InputView({ onSuccess, t, lang }: { onSuccess: () => void; t: any; lang: string; key?: string }) {
  const [loading, setLoading] = useState(false);
  const [persistentFields, setPersistentFields] = useState<{ id: string, name: string }[]>([]);
  const [formData, setFormData] = useState({
    truckPlate: '',
    driverName: '',
    origin: '',
    destination: '',
    status: 'Pending' as const,
    type: 'Container'
  });
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [newFieldName, setNewFieldName] = useState('');
  const [addingField, setAddingField] = useState(false);

  // Fetch persistent custom fields
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'custom_fields'), (snapshot) => {
      const fields = snapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        timestamp: doc.data().timestamp || ''
      })).sort((a, b) => b.timestamp.localeCompare(a.timestamp));
      setPersistentFields(fields);
    });
    return () => unsubscribe();
  }, []);

  const handleAddPersistentField = async () => {
    if (!newFieldName.trim() || addingField) return;
    setAddingField(true);
    try {
      await addDoc(collection(db, 'custom_fields'), {
        name: newFieldName.trim(),
        timestamp: new Date().toISOString()
      });
      setNewFieldName('');
    } catch (err: any) {
      console.error("Error adding field:", err);
      alert(lang === 'id' ? "Gagal menambah kolom: " + err.message : "Failed to add column: " + err.message);
    } finally {
      setAddingField(false);
    }
  };

  const handleDeletePersistentField = async (id: string) => {
    // Note: window.confirm is blocked in some iFrame environments, 
    // removing for direct action to ensure it works.
    try {
      await deleteDoc(doc(db, 'custom_fields', id));
      // Reset values for that field if present
      const field = persistentFields.find(f => f.id === id);
      if (field) {
        setFieldValues(prev => {
          const next = { ...prev };
          delete next[field.name];
          return next;
        });
      }
    } catch (err: any) {
      console.error("Error deleting field:", err);
      alert(lang === 'id' ? "Gagal menghapus kolom: " + err.message : "Failed to delete column: " + err.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const docData: any = {
        ...formData,
        ...fieldValues,
        timestamp: new Date().toISOString()
      };
      
      await addDoc(collection(db, 'shipments'), docData);
      
      // Reset form COMPLETELY
      setFieldValues({});
      setFormData({
        truckPlate: '',
        driverName: '',
        origin: '',
        destination: '',
        status: 'Pending',
        type: 'Container'
      });
      
      onSuccess();
    } catch (err: any) {
      console.error(err);
      alert(lang === 'id' ? "Gagal menyimpan data ke Firebase: " + err.message : "Failed to save data to Firebase: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-3xl mx-auto py-6"
    >
      <div className="bg-white border border-slate-200 p-10 rounded-2xl shadow-xl relative overflow-hidden ring-1 ring-slate-900/5">
        <div className="absolute top-0 right-0 p-10 opacity-[0.03] select-none pointer-events-none">
          <Plus size={200} className="text-blue-600" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-10 border-b border-slate-200 pb-6">
            <div>
              <h2 className="text-3xl font-black text-black tracking-tight leading-none mb-2">{t.dataEntry}</h2>
              <div className="flex items-center gap-2">
                <div className="w-8 h-1 bg-brand-light rounded-full" />
                <span className="text-[10px] font-black text-brand-light uppercase tracking-[0.2em]">{t.step} 01</span>
              </div>
            </div>
            <div className="hidden sm:block">
               <Truck size={40} className="text-slate-100" />
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#001A5E] ml-1 block">{t.manifest}</label>
                <input 
                  required
                  value={formData.truckPlate}
                  onChange={e => setFormData({...formData, truckPlate: e.target.value.toUpperCase()})}
                  placeholder="e.g. PCN-2023-882"
                  className="modern-input h-12 font-mono"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#001A5E] ml-1 block">{t.consignee}</label>
                <input 
                  required
                  value={formData.driverName}
                  onChange={e => setFormData({...formData, driverName: e.target.value})}
                  placeholder="Recipient Name"
                  className="modern-input h-12"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#001A5E] ml-1 block">{t.origin}</label>
                <input 
                  required
                  value={formData.origin}
                  onChange={e => setFormData({...formData, origin: e.target.value})}
                  placeholder="e.g. Jakarta Hub"
                  className="modern-input h-12"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#001A5E] ml-1 block">{t.destination}</label>
                <input 
                  required
                  value={formData.destination}
                  onChange={e => setFormData({...formData, destination: e.target.value})}
                  placeholder="Delivery Address"
                  className="modern-input h-12"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#001A5E] ml-1 block">{t.category}</label>
                <div className="relative">
                  <select 
                    value={formData.type}
                    onChange={e => setFormData({...formData, type: e.target.value})}
                    className="modern-select h-12"
                  >
                    <option value="Container">Container</option>
                    <option value="Loose Cargo">Loose Cargo</option>
                    <option value="Liquid">Liquid</option>
                    <option value="Refrigerated">Refrigerated</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#001A5E] ml-1 block">{t.status}</label>
                <div className="relative">
                  <select 
                    value={formData.status}
                    onChange={e => setFormData({...formData, status: e.target.value as any})}
                    className="modern-select h-12"
                  >
                    <option value="Pending">{lang === 'id' ? 'Menunggu' : 'Pending'}</option>
                    <option value="In Transit">{lang === 'id' ? 'Dalam Perjalanan' : 'In Transit'}</option>
                    <option value="Delivered">{lang === 'id' ? 'Terkirim' : 'Delivered'}</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-10 border-t border-slate-100 space-y-8">
              {/* Add New Field Tool - Positioned below Container/Status and above Field Names */}
              <div className="bg-slate-50 border-2 border-dashed border-slate-200 p-8 rounded-2xl group focus-within:border-blue-400 transition-all shadow-sm">
                <div className="flex gap-4 items-end">
                  <div className="flex-1 space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-800 ml-1 block">{t.fieldName}</label>
                    <input 
                      value={newFieldName} 
                      onChange={e => setNewFieldName(e.target.value)} 
                      placeholder={t.fieldPlaceholder} 
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddPersistentField())} 
                      className="modern-input h-11 bg-white border-slate-200 focus:ring-4 focus:ring-blue-500/10" 
                      disabled={addingField}
                    />
                  </div>
                  <button 
                    type="button" 
                    onClick={handleAddPersistentField} 
                    disabled={addingField || !newFieldName.trim()}
                    className="h-11 px-8 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-600/10 font-black text-[10px] uppercase tracking-widest disabled:opacity-50"
                  >
                    {addingField ? <RefreshCw className="animate-spin" size={16} /> : <Plus size={18} />}
                    {t.addColumn}
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg text-brand-light">
                    <Settings2 size={16} />
                  </div>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-black">{t.customAttrs}</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-4">
                  {persistentFields.map((field) => (
                    <div key={field.id} className="group relative animate-in fade-in slide-in-from-top-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-800 ml-1 block mb-2">{field.name}</label>
                      <div className="relative">
                        <input 
                          value={fieldValues[field.name] || ''}
                          onChange={e => setFieldValues({...fieldValues, [field.name]: e.target.value})}
                          placeholder={t.valPlaceholder}
                          className="modern-input h-11 pr-10 bg-slate-50/50 hover:bg-white transition-colors border-slate-200 focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400"
                        />
                        <button 
                          type="button" 
                          onClick={() => handleDeletePersistentField(field.id)} 
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-red-500 transition-colors p-2 z-20 cursor-pointer"
                          title={t.delete}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading} 
              className="w-full h-14 bg-blue-600 hover:shadow-2xl hover:shadow-blue-600/30 text-white font-black uppercase tracking-[0.3em] text-[11px] rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 mt-12"
            >
              {loading ? <RefreshCw className="animate-spin" size={20} /> : <Save size={20} />}
              {t.pushData}
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

function PerformanceView({ t }: { t: any, key?: string }) {
  const { 
    otdValue, otdTarget, 
    perfectOrderValue, perfectOrderTarget, 
    cycleTime: cycleTimeData, 
    transitTime: transitTimeData, 
    delayCauses, 
    claimsRate: claimsRateData, 
    fuelEfficiency: fuelEfficiencyData, 
    costDist: costDistData, 
    costTrend: performanceCostTrend 
  } = MASTER_DATA_SOURCE.performance;

  const otdData = { value: otdValue, target: otdTarget };
  const perfectOrderData = { value: perfectOrderValue, target: perfectOrderTarget };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6 pb-12 bg-white p-6 rounded-3xl border border-slate-200 shadow-2xl"
    >
      {/* Header Panel */}
      <div className="bg-[#f8fafc] border border-slate-200 p-4 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-brand-dark rounded-xl text-white">
            <BarChart2 size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-black uppercase tracking-tight leading-none">{t.opsPerformance}</h1>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Q3 2024 | {t.totalArmada}: 55 | {t.lastUpdated}: 12 Okt 2024 10:00</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-black text-black uppercase">{t.autoSync}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column: Performance Summary */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-full flex flex-col justify-center items-center text-center">
          <h2 className="text-sm font-black text-black uppercase tracking-widest mb-6 leading-tight">{t.perfSummary}</h2>
          <div className="space-y-8 w-full">
            <div className="flex flex-col items-center">
              <Truck size={64} className="text-brand-light mb-4" />
              <div className="flex gap-4">
                <Clock size={32} className="text-brand-dark opacity-50" />
                <TrendingUp size={32} className="text-green-500" />
              </div>
            </div>
            <p className="text-[11px] font-bold text-slate-600 uppercase leading-relaxed max-w-xs mx-auto italic">
              Optimasi rute dan efisiensi waktu transit menjadi fokus utama kuartal ini.
            </p>
          </div>
        </div>

        {/* Right Columns: Main Metrics Grid */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* OTD */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">{t.otd}</h3>
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="56" cy="56" r="48" stroke="#f1f5f9" strokeWidth="10" fill="transparent" />
                <circle cx="56" cy="56" r="48" stroke="#00AEEF" strokeWidth="10" fill="transparent" strokeDasharray="301.59" strokeDashoffset={301.59 * (1 - 0.981)} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-black">98.1%</span>
              </div>
            </div>
            <p className="text-[10px] font-black text-slate-700 uppercase tracking-widest mt-2">{t.target}: 98% (Q3 2024)</p>
          </div>

          {/* Perfect Order */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">{t.perfectOrder}</h3>
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="56" cy="56" r="48" stroke="#f1f5f9" strokeWidth="10" fill="transparent" />
                <circle cx="56" cy="56" r="48" stroke="#22c55e" strokeWidth="10" fill="transparent" strokeDasharray="301.59" strokeDashoffset={301.59 * (1 - 0.958)} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-black">95.8%</span>
              </div>
            </div>
            <p className="text-[10px] font-black text-slate-700 uppercase tracking-widest mt-2">{t.target}: 96%</p>
          </div>

          {/* Cost per KM */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">{t.costPerKm}</h3>
            <div className="text-2xl font-black text-black mb-1">Rp 12,400</div>
            <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">(Avg Q3 2024)</div>
            <div className="h-10 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceCostTrend}>
                  <Area type="monotone" dataKey="cost" stroke="#00AEEF" fill="#00AEEF10" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[10px] font-black text-slate-700 uppercase tracking-widest mt-2">Cost: Rp 3.2 Milyar</p>
          </div>

          {/* Accidents */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">{t.accidents}</h3>
            <div className="text-6xl font-black text-green-500 mb-2">0</div>
            <div className="text-[10px] font-black text-black uppercase tracking-widest">{t.noIncidents}</div>
            <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">(Q3 2024)</div>
          </div>
        </div>
      </div>

      {/* Second Row Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Delivery Performance */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-xs font-black text-black uppercase tracking-widest text-center border-b border-slate-100 pb-3">{t.deliveryPerf}</h2>
          
          <div className="space-y-1 text-center">
            <p className="text-[9px] font-black text-slate-500 uppercase">{t.orderCycleTime}</p>
            <div className="h-[120px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cycleTimeData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" hide />
                  <Tooltip />
                  <Bar dataKey="value" fill="#00AEEF" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[10px] font-black text-black uppercase">4.2 hari | 4.1 hari | 4.2 hari</p>
          </div>

          <div className="space-y-1 text-center">
            <p className="text-[9px] font-black text-slate-500 uppercase">{t.transitTime}</p>
            <div className="h-[100px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={transitTimeData}>
                  <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#f1f5f9" />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#001A5E" strokeWidth={3} dot={{ r: 4, fill: '#001A5E' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[10px] font-black text-black uppercase">1.8 hari avg</p>
          </div>

          <div className="space-y-2">
            <p className="text-[9px] font-black text-slate-500 uppercase text-center">{t.delayCauses}</p>
            <div className="h-[100px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={delayCauses} cx="50%" cy="50%" innerRadius={25} outerRadius={40} dataKey="value">
                    {delayCauses.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[8px] font-black text-black uppercase">
               {delayCauses.map((c, i) => (
                 <div key={i} className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
                    {c.name}: {c.value}%
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Quality & Reliability */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-xs font-black text-black uppercase tracking-widest text-center border-b border-slate-100 pb-3">{t.qualityReliability}</h2>
          
          <div className="overflow-hidden rounded-xl border border-slate-100">
             <table className="w-full text-[9px] text-left border-collapse">
                <thead>
                   <tr className="bg-slate-50 text-slate-500 font-black uppercase tracking-widest">
                      <th className="px-3 py-2">Metric</th>
                      <th className="px-3 py-2 text-center">Q3</th>
                      <th className="px-3 py-2 text-center">Q2</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-[10px] font-black text-black">
                   <tr className="hover:bg-slate-50/50">
                      <td className="px-3 py-3 border-r border-slate-50">{t.orderAccuracy}</td>
                      <td className="px-3 py-3 text-center text-green-600">99.1%</td>
                      <td className="px-3 py-3 text-center text-slate-500">98.5%</td>
                   </tr>
                   <tr className="hover:bg-slate-50/50">
                      <td className="px-3 py-3 border-r border-slate-50">{t.damageFree}</td>
                      <td className="px-3 py-3 text-center text-green-600">99.7%</td>
                      <td className="px-3 py-3 text-center text-slate-500">99.4%</td>
                   </tr>
                </tbody>
             </table>
          </div>

          <div className="space-y-4 pt-4">
             <p className="text-[9px] font-black text-slate-500 uppercase text-center tracking-widest">{t.claimsRate}</p>
             <div className="h-[180px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={claimsRateData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 900 }} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#001A5E" radius={[4, 4, 0, 0]} label={{ position: 'top', fontSize: 10, fontWeight: 900, fill: '#001A5E', formatter: (v: any) => `<${v}%` }} />
                   </BarChart>
                </ResponsiveContainer>
             </div>
          </div>
        </div>

        {/* Cost Efficiency */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-xs font-black text-black uppercase tracking-widest text-center border-b border-slate-100 pb-3">{t.costEfficiency}</h2>
          
          <div className="space-y-4">
             <p className="text-[9px] font-black text-slate-500 uppercase text-center tracking-widest">{t.fuelConsumption}</p>
             <div className="h-[150px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                   <LineChart data={fuelEfficiencyData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 900 }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#22C55E" strokeWidth={4} dot={{ r: 6, fill: '#22C55E', stroke: '#fff', strokeWidth: 2 }} />
                   </LineChart>
                </ResponsiveContainer>
             </div>
             <p className="text-center text-[10px] font-black text-slate-500 italic">Target Efisiensi: {'>'}1.0 KM/L</p>
          </div>

          <div className="space-y-4 pt-4">
             <p className="text-[9px] font-black text-slate-500 uppercase text-center tracking-widest">{t.opsCostDist}</p>
             <div className="flex flex-col items-center">
                <div className="h-[140px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={costDistData} cx="50%" cy="50%" outerRadius={60} innerRadius={35} dataKey="value">
                        {costDistData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-center mt-2">
                   <div className="text-lg font-black text-black">Rp 640 Juta</div>
                   <div className="text-[8px] font-black text-slate-400">Total Ops Cost (Current Month)</div>
                </div>
             </div>
          </div>
        </div>

        {/* Fleet & Asset Management */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-xs font-black text-black uppercase tracking-widest text-center border-b border-slate-100 pb-3">{t.fleetAssetMgmt}</h2>
          
          <div className="space-y-5">
             <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-black uppercase text-slate-700">
                   <span>{t.utilizationRate}</span>
                   <span className="text-green-600">92%</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                   <div className="h-full bg-green-500 w-[92%]" />
                </div>
             </div>

             <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-black uppercase text-slate-700">
                   <span>{t.emptyMiles}</span>
                   <span className="text-orange-500">11%</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                   <div className="h-full bg-orange-500 w-[11%]" />
                </div>
             </div>

             <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1 text-center border-dashed">
                <p className="text-[9px] font-black text-slate-400 uppercase">{t.vehicleDowntime}</p>
                <p className="text-lg font-black text-black">3 hari per bulan</p>
                <div className="h-1.5 w-full bg-slate-200 rounded-full mt-2">
                   <div className="h-full bg-brand-dark w-1/4 rounded-full" />
                </div>
             </div>
          </div>

          <div className="space-y-3 pt-2">
             <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-black">
                <span>{t.fleetTracking}</span>
                <Map size={14} className="text-brand-light" />
             </div>
             <div className="aspect-video bg-blue-50 rounded-xl overflow-hidden border border-slate-200 relative grayscale contrast-125 opacity-30">
                <div className="absolute inset-0 p-4">
                   {/* Mock World Map with markers */}
                   <div className="absolute top-[30%] left-[40%] animate-pulse bg-brand-dark w-2 h-2 rounded-full shadow-[0_0_8px_#001A5E]" />
                   <div className="absolute top-[50%] left-[70%] animate-pulse bg-brand-dark w-2 h-2 rounded-full shadow-[0_0_8px_#001A5E]" />
                   <div className="absolute top-[20%] left-[80%] animate-pulse bg-brand-dark w-2 h-2 rounded-full shadow-[0_0_8px_#001A5E]" />
                   <div className="absolute top-[60%] left-[20%] animate-pulse bg-brand-dark w-2 h-2 rounded-full shadow-[0_0_8px_#001A5E]" />
                </div>
             </div>
             <div className="text-center">
                <button className="text-[10px] font-black text-brand-dark uppercase underline tracking-widest">{t.fleetCenter}</button>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProcurementView({ t }: { t: any, key?: string }) {
  const { 
    spend: totalSpend, 
    otd: onTimeDelivery, 
    satisfaction: vendorSatisfaction, 
    vendors: vendorData, 
    costDist: pieData, 
    monthlyCost: lineData, 
    additionalCosts: barData 
  } = MASTER_DATA_SOURCE.procurement;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 pb-12 bg-slate-50/50 p-6 rounded-2xl border border-slate-200 shadow-xl"
    >
      <div className="bg-[#001A5E] -mx-6 -mt-6 p-6 mb-8 rounded-t-2xl shadow-lg border-b border-white/10 text-center">
        <h1 className="text-3xl font-black text-white tracking-widest uppercase">{t.procurement} Dashboard</h1>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
          <div>
            <h2 className="text-2xl font-black text-black uppercase tracking-tight mb-2">{t.procurementOverview}</h2>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Periode Data: Q3 2024 | Total Vendor Aktif: 28</p>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center">
              <BarChart2 size={32} className="text-brand-light mb-1" />
              <p className="text-[9px] font-black text-black">Pengiriman: 65%</p>
            </div>
            <div className="flex flex-col items-center">
              <Layers size={32} className="text-brand-dark mb-1" />
              <p className="text-[9px] font-black text-black">Pergudangan: 25%</p>
            </div>
            <div className="flex flex-col items-center">
              <Map size={32} className="text-brand-light mb-1" />
              <p className="text-[9px] font-black text-black">Lainnya: 10%</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#f0f9ff] p-5 rounded-2xl border border-slate-200 flex flex-col items-center text-center">
            <h3 className="text-[10px] font-black text-[#001A5E] uppercase tracking-widest mb-4">{t.procurementSpend}</h3>
            <div className="text-3xl font-black text-black tracking-tighter mb-1">{totalSpend}</div>
            <div className="flex items-center gap-1 text-green-600 text-[10px] font-black mb-4">
              <TrendingUp size={14} /> 4.2% vs Q2
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-2">
              <div className="bg-brand-light h-full w-[65%]" />
            </div>
            <div className="text-[8px] font-bold text-slate-500 uppercase flex gap-4 text-center justify-center">
              <span>Pengiriman: 65%</span>
              <span>Lainnya: 10%</span>
            </div>
          </div>

          <div className="bg-[#f0f9ff] p-5 rounded-2xl border border-slate-200 flex flex-col items-center text-center">
            <h3 className="text-[10px] font-black text-[#001A5E] uppercase tracking-widest mb-4">{t.onTimeDelivery}</h3>
            <div className="relative w-24 h-24 flex items-center justify-center mb-2">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="48" cy="48" r="44" stroke="#e2e8f0" strokeWidth="8" fill="transparent" />
                <circle cx="48" cy="48" r="44" stroke="#22c55e" strokeWidth="8" fill="transparent" strokeDasharray="276.46" strokeDashoffset={276.46 * (1 - onTimeDelivery / 100)} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-black text-black">{onTimeDelivery}%</span>
              </div>
            </div>
            <p className="text-[9px] font-black text-slate-800 uppercase tracking-widest mt-1">Target SLA: 98%</p>
            <p className="text-[9px] font-black text-red-500 uppercase tracking-widest italic">Total Keterlambatan: 14/742</p>
          </div>

          <div className="bg-[#f0f9ff] p-5 rounded-2xl border border-slate-200 flex flex-col items-center text-center">
            <h3 className="text-[10px] font-black text-[#001A5E] uppercase tracking-widest mb-4">{t.vendorSatisfaction}</h3>
            <div className="text-4xl font-black text-black mb-2">{vendorSatisfaction} / 5</div>
            <div className="flex gap-1 text-orange-400 mb-6 scale-125">
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} stroke="currentColor" fill="none" /> 
            </div>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Berdasarkan Survei Q3 2024</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
           <h2 className="text-xl font-black text-black uppercase tracking-tight mb-8 text-center">{t.keyVendorAnalysis}</h2>
           <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse">
               <thead>
                 <tr className="bg-[#f0f9ff] text-[10px] font-black uppercase tracking-widest text-[#001A5E] border-b border-slate-200">
                   <th className="px-4 py-3">Vendor</th>
                   <th className="px-4 py-3 text-center">{t.slaScore}</th>
                   <th className="px-4 py-3 text-center">{t.fleetCount}</th>
                   <th className="px-4 py-3">{t.coverage}</th>
                   <th className="px-4 py-3 text-right">Volume</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                 {vendorData.map((vendor, i) => (
                   <tr key={i} className="hover:bg-slate-50 transition-all font-bold">
                     <td className="px-4 py-4 text-[11px] font-black text-slate-800">{vendor.name}</td>
                     <td className="px-4 py-4 text-center text-[11px] text-brand-dark">{vendor.sla}</td>
                     <td className="px-4 py-4 text-center text-[11px] text-brand-dark">{vendor.fleet}</td>
                     <td className="px-4 py-4 text-[10px] text-slate-600 uppercase tracking-tighter">{vendor.coverage}</td>
                     <td className="px-4 py-4 text-right">
                        <div className="flex justify-end items-end gap-0.5 h-8">
                           {vendor.volumes.map((v, j) => (
                             <div key={j} className="bg-brand-dark w-2" style={{ height: `${v}%` }} />
                           ))}
                        </div>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
           <h2 className="text-xl font-black text-black uppercase tracking-tight mb-8 text-center">{t.procDocumentStatus}</h2>
           
           <h4 className="text-[10px] font-black text-black uppercase tracking-[0.2em] mb-4">{t.rfqFlow}</h4>
           <div className="flex items-center justify-between gap-2 mb-10 overflow-x-auto pb-2">
              {[
                { label: t.rfiCreation, active: true },
                { label: t.rfqIssuance, active: true },
                { label: t.ongoingEval, active: false },
                { label: t.contractSigning, active: false }
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center gap-3 min-w-[80px]">
                   <div className={cn(
                     "w-12 h-12 rounded-lg flex items-center justify-center border-2 shadow-sm transition-all relative overflow-hidden",
                     step.active ? "bg-green-500 border-green-600 text-white" : "bg-slate-100 border-slate-200 text-slate-400 group"
                   )}>
                      {step.active ? <CheckCircle2 size={24} /> : <Edit2 size={24} />}
                      {i < 3 && (
                        <ChevronRight className="absolute -right-1 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={16} />
                      )}
                   </div>
                   <p className={cn("text-[8px] font-black text-center uppercase leading-tight w-20", step.active ? "text-brand-dark" : "text-slate-400")}>
                      {step.label}
                   </p>
                </div>
              ))}
           </div>

           <h4 className="text-[10px] font-black text-black uppercase tracking-[0.2em] mb-4">{t.slaRequirements}</h4>
           <div className="space-y-4">
              {[
                { label: t.vendorResponse, value: 96, color: '#001A5E' },
                { label: t.loadingTime, value: 93, color: '#F97316' },
                { label: t.gpsAvail, value: 100, color: '#00AEEF' }
              ].map((sla, i) => (
                <div key={i} className="space-y-1.5">
                   <div className="flex justify-between items-center text-[10px] font-black uppercase text-slate-800">
                      <span>{sla.label}</span>
                      <span style={{ color: sla.color }}>{sla.value}%</span>
                   </div>
                   <div className="bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${sla.value}%` }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: sla.color }}
                      />
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <h2 className="text-xl font-black text-black uppercase tracking-tight mb-8 text-center">{t.opsCosts}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex flex-col items-center">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">{t.costDistribution}</h4>
            <div className="h-[180px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-1 w-full text-[9px] font-bold text-slate-700 uppercase">
               {pieData.map((p, i) => (
                 <div key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                    <span>{p.name}: {p.value}%</span>
                 </div>
               ))}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">{t.trendCostKm}</h4>
            <div className="h-[180px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={lineData}>
                     <defs>
                        <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#00AEEF" stopOpacity={0.3}/>
                           <stop offset="95%" stopColor="#00AEEF" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 900, fill: '#000000' }} />
                     <YAxis hide />
                     <Tooltip />
                     <Area type="monotone" dataKey="cost" stroke="#00AEEF" strokeWidth={3} fillOpacity={1} fill="url(#colorCost)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
            <div className="mt-4 text-[10px] font-black text-brand-dark flex gap-4 uppercase">
               <span>Juli</span>
               <span>Agust</span>
               <span>September</span>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">{t.additionalCosts}</h4>
            <div className="h-[180px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="name" hide />
                     <YAxis hide />
                     <Tooltip cursor={{ fill: '#f8fafce0' }} />
                     <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                        {barData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                     </Bar>
                  </BarChart>
               </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2 w-full text-[8px] font-black text-center text-slate-700 uppercase leading-none">
               {barData.map((b, i) => (
                 <div key={i} className="flex flex-col gap-1 items-center">
                    <span className="text-[10px] font-black text-black">{b.value}%</span>
                    <div className="w-full h-1 rounded" style={{ backgroundColor: b.color }} />
                    <span className="h-6">{b.name}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ResourceView({ t }: { t: any, key?: string }) {
  const { fleet: resourceData, performance: vendorPerformance, summaryCount, breakdown } = MASTER_DATA_SOURCE.resource;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 pb-12 bg-slate-50/50 p-6 rounded-2xl border border-slate-200 shadow-xl"
    >
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-3xl font-black text-black tracking-widest uppercase">{t.monitoringResource}</h1>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center justify-center gap-4 bg-[#e0f2fe] p-3 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
          <span className="text-xs">📍</span>
          <select className="bg-transparent text-[10px] font-black uppercase tracking-wider text-black outline-none border-none">
            <option>Semua Area 🗺️</option>
          </select>
        </div>
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
          <span className="text-xs">🏢</span>
          <select className="bg-transparent text-[10px] font-black uppercase tracking-wider text-black outline-none border-none">
            <option>Semua Vendor 📁</option>
          </select>
        </div>
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
          <span className="text-xs">🚚</span>
          <select className="bg-transparent text-[10px] font-black uppercase tracking-wider text-black outline-none border-none">
            <option>Pilih Tipe Truck 🚛</option>
          </select>
        </div>
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
          <span className="text-xs">🟢</span>
          <select className="bg-transparent text-[10px] font-black uppercase tracking-wider text-black outline-none border-none">
            <option>Pilih Status 📶</option>
          </select>
        </div>
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
          <span className="text-xs">📅</span>
          <select className="bg-transparent text-[10px] font-black uppercase tracking-wider text-black outline-none border-none">
            <option>Periode: Hari Ini 📊</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xs font-black text-slate-800 uppercase tracking-widest px-2">{t.summaryStatus}</h2>
        
        {/* Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Ready */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-brand-light transition-all">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{t.totalReady}</h3>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 shrink-0 text-center flex flex-col items-center justify-center">
                 <div className="absolute inset-0 border-8 border-slate-100 rounded-full" />
                 <div className="absolute inset-0 border-8 border-green-500 rounded-full clip-path-donut" style={{ clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%)' }} />
                 <span className="text-sm font-black text-black z-10">{summaryCount.ready}</span>
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-black text-black">{summaryCount.ready} Unit</span>
                </div>
                <div className="grid grid-cols-2 gap-x-2 text-[8px] font-bold text-slate-500 uppercase leading-tight">
                  <p>CDE: 10</p>
                  <p>CDD: 15</p>
                  <p>Wingbox: 20</p>
                  <p>Tronton: 20</p>
                </div>
              </div>
            </div>
            <div className="mt-2 text-[10px] font-bold text-black border-t border-slate-50 pt-2">{t.standbyPool}</div>
          </div>

          {/* Total In-Transit */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-brand-dark transition-all">
            <div className="flex items-center gap-2 mb-4">
              <Truck size={14} className="text-brand-light" />
              <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{t.totalInTransit}</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-end justify-between">
                <div className="h-10 w-full bg-slate-100 rounded-lg overflow-hidden relative border border-slate-200">
                  <div className="h-full bg-gradient-to-r from-brand-light to-brand-dark w-[70%]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-black text-white mix-blend-overlay">{summaryCount.transit} Unit</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-2 text-[8px] font-bold text-slate-500 uppercase leading-tight">
                <p>On Delivery</p>
                <p className="text-right font-black text-brand-dark">70% ACTIVE</p>
                <div className="col-span-2 mt-1">
                  Wingbox: 40, Tronton: 35, Fuso: 25, Trailer: 12
                </div>
              </div>
            </div>
          </div>

          {/* Maintenance/Breakdown */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-yellow-500 transition-all">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{t.maintenanceBreakdown}</h3>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-50 rounded-xl text-yellow-600 border border-yellow-100">
                <RefreshCw size={24} />
              </div>
              <div className="space-y-1">
                <div className="text-lg font-black text-black">{summaryCount.maintenance} Unit</div>
                <div className="text-[9px] font-bold text-slate-500 uppercase space-y-0.5">
                  <p>Maintenance: 10</p>
                  <p>Breakdown: 8</p>
                </div>
                <div className="text-[10px] font-black text-yellow-600 uppercase tracking-tighter">
                   {t.actionRequired}
                </div>
              </div>
            </div>
          </div>

          {/* Remaining Capacity */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-purple-500 transition-all">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-purple-500" />
              <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{t.remainingCapacity}</h3>
            </div>
            <div className="space-y-3">
              <div className="flex gap-1 h-8 rounded overflow-hidden">
                <div className="h-full bg-blue-600 w-[60%]" />
                <div className="h-full bg-green-500 w-[15%]" />
                <div className="h-full bg-slate-200 w-[25%]" />
              </div>
              <div className="flex items-center justify-between text-[10px] font-black text-black">
                <div className="flex items-center gap-1">🚛 <span className="text-lg tracking-tighter">~25% {t.remaining}</span></div>
              </div>
              <div className="text-[9px] font-bold text-slate-500 uppercase flex gap-4">
                <span>{t.tonnage} {t.remaining}: 450 Ton</span>
                <span>{t.volume} {t.remaining}: 1800 CBM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Truck Type Breakdown */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="bg-[#f0f9ff] px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <Layers size={18} className="text-brand-dark" />
             <h2 className="text-[10px] font-black text-black uppercase tracking-widest">{t.truckTypeBreakdown || "Truck Type Stock Breakdown"}</h2>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[10px] uppercase font-bold">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 border-b border-slate-200">
                <th className="px-6 py-4">{t.truckType}</th>
                <th className="px-6 py-4 text-black">{t.stock}</th>
                <th className="px-6 py-4 text-green-600">{t.ready}</th>
                <th className="px-6 py-4 text-brand-dark">{t.onDuty}</th>
                <th className="px-6 py-4 text-yellow-600">{t.offDuty}</th>
                <th className="px-6 py-4 text-right">{t.percentage}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {breakdown.map((item: any, i: number) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-black text-black">{item.type}</td>
                  <td className="px-6 py-4">{item.stock} Units</td>
                  <td className="px-6 py-4 text-green-600">{item.ready} Units</td>
                  <td className="px-6 py-4 text-brand-dark">{item.transit} Units</td>
                  <td className="px-6 py-4 text-yellow-600">{item.maintenance} Units</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden hidden sm:block">
                          <div className="h-full bg-brand-light" style={{ width: `${item.percentage}%` }} />
                       </div>
                       <span className="font-black text-brand-dark">{item.percentage}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Real-time details */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="bg-[#f0f9ff] px-6 py-4 border-b border-slate-200 flex items-center gap-3">
          <Activity size={18} className="text-brand-dark" />
          <h2 className="text-[10px] font-black text-black uppercase tracking-widest">{t.unitDetails}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] font-black uppercase tracking-widest text-slate-500 border-b border-slate-200">
                <th className="px-6 py-4">{t.unitId} ↕️</th>
                <th className="px-6 py-4">{t.truckType} ↕️</th>
                <th className="px-6 py-4">{t.vendor} ↕️</th>
                <th className="px-6 py-4">{t.statusLabel} ↕️</th>
                <th className="px-6 py-4">{t.area} ↕️</th>
                <th className="px-6 py-4">{t.routeEta}</th>
                <th className="px-6 py-4">Driver</th>
                <th className="px-6 py-4">{t.action}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {resourceData.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/80 transition-all group">
                  <td className="px-6 py-4">
                    <div className="font-mono text-black text-[10px] font-black bg-slate-100 px-2 py-1 rounded inline-block">
                      {row.id}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[10px] font-black text-slate-800 uppercase">{row.type}</td>
                  <td className="px-6 py-4 text-[10px] font-bold text-slate-600 uppercase">{row.vendor}</td>
                  <td className="px-6 py-4">
                    <div className={cn(
                      "flex items-center gap-2 px-2 py-1 rounded-full text-[9px] font-black uppercase w-fit min-w-[90px] border shadow-sm",
                      row.status === 'Ready' 
                        ? "bg-green-100/50 text-green-700 border-green-200" 
                        : row.status === 'In-Transit' 
                        ? "bg-blue-100/50 text-blue-700 border-blue-200" 
                        : "bg-yellow-100/50 text-yellow-700 border-yellow-200"
                    )}>
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        row.status === 'Ready' ? "bg-green-500 animate-pulse" : row.status === 'In-Transit' ? "bg-blue-500" : "bg-yellow-500"
                      )} />
                      {row.status}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[10px] font-bold text-slate-700">
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-2.5 bg-red-600 rounded-sm relative overflow-hidden border border-slate-200">
                         <div className="bg-white h-1 w-full absolute top-0" />
                      </div>
                      {row.area}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[9px] font-black text-slate-800 uppercase tracking-tighter max-w-[150px]">{row.route}</td>
                  <td className="px-6 py-4 text-[10px] font-black text-slate-900">{row.driver}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center gap-2 justify-end">
                       <button className="p-1.5 bg-blue-100 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition-all">
                          <Search size={12} />
                       </button>
                       <button className="p-1.5 bg-slate-100 text-brand-dark rounded hover:bg-brand-dark hover:text-white transition-all">
                          <ChevronRight size={12} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-slate-50 px-6 py-2 border-t border-slate-200 flex items-center justify-center gap-2">
           <button className="text-[10px] font-black text-slate-400">&lt; Previous</button>
           <button className="w-5 h-5 rounded bg-brand-dark text-white text-[9px] font-black">1</button>
           <button className="w-5 h-5 rounded bg-white border border-slate-200 text-black text-[9px] font-black shadow-sm">2</button>
           <button className="w-5 h-5 rounded bg-white border border-slate-200 text-black text-[9px] font-black shadow-sm">3</button>
           <button className="text-[10px] font-black text-slate-400">Next &gt;</button>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map Placeholder */}
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm flex flex-col">
           <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                 <div className="p-1.5 bg-indigo-50 rounded-lg text-indigo-600 border border-indigo-100">
                    <Search size={14} />
                 </div>
                 <h3 className="text-[10px] font-black text-black uppercase tracking-widest">{t.mapView}</h3>
              </div>
           </div>
           <div className="flex-1 bg-blue-50 relative min-h-[300px]">
              {/* Mock Map Image Representation */}
              <div className="absolute inset-0 grayscale contrast-125 opacity-20" 
                   style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #ccc 1px, transparent 0)', backgroundSize: '24px 24px' }} />
              
              <div className="absolute inset-0 p-8 flex items-center justify-center">
                 <div className="relative w-full h-full border border-dashed border-slate-300 rounded-2xl">
                    <div className="absolute top-[20%] left-[30%]">📍 <span className="p-0.5 bg-white border border-slate-200 rounded text-[7px] font-black">Wingbox A</span></div>
                    <div className="absolute top-[50%] left-[60%]">📍 <span className="p-0.5 bg-white border border-slate-200 rounded text-[7px] font-black">Tronton B</span></div>
                    <div className="absolute top-[70%] left-[40%]">📍 <span className="p-0.5 bg-white border border-slate-200 rounded text-[7px] font-black">CDD C</span></div>
                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-xl border border-slate-200 text-[10px] font-black uppercase text-black italic shadow-xl">
                       [ Map Integration Simulator ]
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Vendor Performance */}
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm p-6">
           <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                 <div className="p-1.5 bg-orange-50 rounded-lg text-orange-500 border border-orange-100">
                    <TrendingUp size={14} />
                 </div>
                 <h3 className="text-[10px] font-black text-black uppercase tracking-widest">{t.topVendor}</h3>
              </div>
              <div className="flex gap-2">
                 <button className="p-1.5 bg-slate-50 border border-slate-200 rounded hover:bg-slate-100 transition-all">
                    <Settings size={12} />
                 </button>
              </div>
           </div>
           
           <div className="space-y-5">
             {vendorPerformance.map((vendor, i) => (
                <div key={i} className="space-y-1.5">
                   <div className="flex justify-between items-center text-[10px] font-black text-black uppercase tracking-widest">
                      <span>{vendor.name}</span>
                      <span className="text-brand-light">{vendor.value}%</span>
                   </div>
                   <div className="h-4 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 p-0.5 shadow-inner">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${vendor.value}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="h-full bg-gradient-to-r from-brand-light to-brand-dark rounded-md"
                      />
                   </div>
                </div>
             ))}
           </div>

           <div className="mt-8 p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-around border-dashed">
              <div className="text-center">
                 <div className="text-[14px] font-black text-brand-dark tracking-tighter">95%</div>
                 <div className="text-[8px] font-black text-slate-400 uppercase">Availability</div>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div className="text-center">
                 <div className="text-[14px] font-black text-green-600 tracking-tighter">92%</div>
                 <div className="text-[8px] font-black text-slate-400 uppercase">SLA Target</div>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div className="text-center">
                 <div className="text-[14px] font-black text-brand-light tracking-tighter">90%</div>
                 <div className="text-[8px] font-black text-slate-400 uppercase">Utilization</div>
              </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
}

function ComplianceView({ t }: { t: any, key?: string }) {
  const { units: complianceData, timeline: timelineData, drivers: driverData } = MASTER_DATA_SOURCE.compliance;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 pb-12"
    >
      {/* Header & Filters */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black text-black tracking-tight leading-none mb-2">{t.compliance} & Legal</h2>
            <p className="text-black text-xs font-bold">Welcome back, Admin! Here is your compliance overview for today.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-[10px] font-black uppercase tracking-widest text-black shadow-sm">
              <Download size={14} className="text-brand-light" />
              {t.exportReport}
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-brand-dark text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-md">
              <Plus size={14} />
              {t.addDoc}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200">
            <Filter size={14} className="text-brand-light" />
            <select className="bg-transparent text-[10px] font-black uppercase tracking-wider text-black outline-none border-none">
              <option>{t.allAreas} 🗺️</option>
            </select>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200">
            <Truck size={14} className="text-brand-light" />
            <select className="bg-transparent text-[10px] font-black uppercase tracking-wider text-black outline-none border-none">
              <option>{t.allVendors} 🏢</option>
            </select>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 ml-auto">
            <Calendar size={14} className="text-brand-light" />
            <select className="bg-transparent text-[10px] font-black uppercase tracking-wider text-black outline-none border-none">
              <option>{t.period}: This Month 📅</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Fleet Compliance */}
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm border-t-4 border-t-green-500">
          <div className="flex justify-between items-start mb-4">
             <h3 className="text-[10px] font-black text-black uppercase tracking-widest">{t.fleetCompliance}</h3>
             <Activity size={16} className="text-green-500" />
          </div>
          <div className="flex items-center gap-6">
            <div className="relative w-16 h-16 flex items-center justify-center">
               <svg className="w-full h-full transform -rotate-90">
                 <circle cx="32" cy="32" r="28" stroke="#f1f5f9" strokeWidth="8" fill="transparent" />
                 <circle cx="32" cy="32" r="28" stroke="#22c55e" strokeWidth="8" fill="transparent" strokeDasharray="175.9" strokeDashoffset={175.9 * (1 - 0.925)} />
               </svg>
               <span className="absolute text-[10px] font-black text-black">92.5%</span>
            </div>
            <div>
              <div className="flex items-center gap-1 text-black">
                <TrendingUp size={14} className="text-green-500" />
                <span className="text-lg font-black tracking-tighter">92.5%</span>
              </div>
              <p className="text-[9px] font-bold text-slate-500 uppercase">{t.complianceRate}</p>
              <p className="text-[9px] font-black text-green-500">+2.1% from last month</p>
            </div>
          </div>
        </div>

        {/* Expired Documents */}
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm border-t-4 border-t-red-500">
          <div className="flex justify-between items-start mb-4">
             <h3 className="text-[10px] font-black text-black uppercase tracking-widest">{t.expiredDocs}</h3>
             <ShieldAlert size={16} className="text-red-500" />
          </div>
          <div className="flex items-center gap-4">
             <div className="p-3 bg-red-50 rounded-xl text-red-500">
                <FileWarning size={24} />
             </div>
             <div>
                <h3 className="text-2xl font-black text-black tracking-tighter">14</h3>
                <p className="text-[9px] font-bold text-black uppercase">STNK: 6, KIR: 8</p>
                <p className="text-[9px] font-black text-red-500">*Action required immediately*</p>
             </div>
          </div>
        </div>

        {/* Upcoming Expiration */}
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm border-t-4 border-t-yellow-500">
          <div className="flex justify-between items-start mb-4">
             <h3 className="text-[10px] font-black text-black uppercase tracking-widest">{t.upcomingExp}</h3>
             <Clock size={16} className="text-yellow-500" />
          </div>
          <div className="flex items-center gap-4">
             <div className="p-3 bg-yellow-50 rounded-xl text-yellow-500">
                <Calendar size={24} />
             </div>
             <div>
                <h3 className="text-2xl font-black text-black tracking-tighter">38 <span className="text-[10px] text-slate-500 font-bold">(Within 30 Days)</span></h3>
                <p className="text-[9px] font-bold text-black uppercase">STNK: 20, KIR: 18</p>
                <p className="text-[9px] font-black text-yellow-600 space-nowrap">*Plan renewals soon*</p>
             </div>
          </div>
        </div>

        {/* Driver Readiness */}
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm border-t-4 border-t-blue-500">
          <div className="flex justify-between items-start mb-4">
             <h3 className="text-[10px] font-black text-black uppercase tracking-widest">{t.driverReadiness}</h3>
             <Users size={16} className="text-brand-light" />
          </div>
          <div className="space-y-3">
             <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-brand-light w-[98%]" />
             </div>
             <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg text-brand-light">
                   <UserIcon size={16} />
                </div>
                <div>
                   <h3 className="text-lg font-black text-black tracking-tighter">98%</h3>
                   <p className="text-[9px] font-bold text-slate-500 uppercase">SIM & K3 Active</p>
                </div>
                <div className="ml-auto text-right">
                   <p className="text-[9px] font-black text-red-500 uppercase">2 Drivers Inactive</p>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Alerts & Table & Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Critical Alerts */}
        <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm flex flex-col h-full">
           <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
              <AlertCircle size={16} className="text-red-500" />
              <h3 className="text-[11px] font-black text-black uppercase tracking-widest">{t.criticalAlerts}</h3>
           </div>
           <div className="space-y-4 flex-1">
              {[
                { title: 'STNK Expired', unit: 'B 9812 PGC', vendor: 'PT Trans Logistik', area: 'JKT', icon: <FileWarning size={14} /> },
                { title: 'SIM B2 Expired', unit: 'Budi Santoso', vendor: 'Surabaya', area: 'SBY', icon: <UserIcon size={14} /> },
                { title: 'KIR Expired', unit: 'D 4455 PGC', vendor: 'PT Mitra Sejati', area: 'BKS', icon: <FileWarning size={14} /> },
                { title: 'Missing Document', unit: 'L 7788 PGC', vendor: 'Cargo Ins *Needs Upload*', area: 'MDN', icon: <AlertCircle size={14} /> },
              ].map((alert, i) => (
                <div key={i} className="flex gap-3 p-3 bg-red-50/30 rounded-lg border border-red-100 hover:bg-red-50 transition-colors">
                   <div className="p-2 bg-white rounded-lg text-red-500 shadow-sm h-fit">
                      {alert.icon}
                   </div>
                   <div>
                      <p className="text-xs font-black text-red-600 mb-1 leading-none uppercase tracking-tighter">[{t.statusLabel === 'Status' ? 'Expired' : 'Kadaluwarsa'}] {alert.unit}</p>
                      <p className="text-[10px] text-slate-600 font-bold leading-tight uppercase font-mono tracking-tighter">Vendor: {alert.vendor} | Area: {alert.area}</p>
                   </div>
                </div>
              ))}
           </div>
           <button className="mt-6 w-full py-2 text-[10px] font-black text-blue-600 uppercase tracking-widest border border-blue-100 rounded-lg hover:bg-blue-50 transition-all">
              [ View All Alerts ]
           </button>
        </div>

        {/* Master Table */}
        <div className="lg:col-span-2 bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
           <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                 <Layers size={16} className="text-brand-light" />
                 <h3 className="text-[11px] font-black text-black uppercase tracking-widest">{t.masterFleetTable}</h3>
              </div>
              <div className="relative">
                 <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                 <input className="bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-1.5 text-[10px] text-black w-48 focus:outline-none focus:border-brand-light font-bold" placeholder="Search Unit/Vendor..." />
              </div>
           </div>

           <div className="overflow-x-auto">
              <table className="w-full text-[10px] uppercase font-bold text-black border-collapse">
                 <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-200 text-slate-500 font-black">
                       <th className="px-4 py-3 text-left tracking-wider">{t.unitId} ↕️</th>
                       <th className="px-4 py-3 text-left tracking-wider">Type ↕️</th>
                       <th className="px-4 py-3 text-left tracking-wider">{t.vendor} ↕️</th>
                       <th className="px-4 py-3 text-left tracking-wider">{t.area} ↕️</th>
                       <th className="px-4 py-3 text-left tracking-wider">EXP. STNK ↕️</th>
                       <th className="px-4 py-3 text-left tracking-wider">EXP. KIR ↕️</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                    {complianceData.map((row, i) => (
                       <tr key={i} className={cn("hover:bg-slate-50 transition-colors", row.status === 'warning' && "bg-yellow-50/10")}>
                          <td className="px-4 py-3 font-black text-black font-mono">{row.id}</td>
                          <td className="px-4 py-3 border-l border-slate-100">{row.type}</td>
                          <td className="px-4 py-3 border-l border-slate-100">{row.vendor}</td>
                          <td className="px-4 py-3 border-l border-slate-100">{row.area}</td>
                          <td className={cn("px-4 py-3 border-l border-slate-100 font-black", i === 2 && "text-brand-dark")}>{row.expStnk}</td>
                          <td className={cn("px-4 py-3 border-l border-slate-100 font-black", row.expKir === 'Expired' || row.expKir.includes('15') ? "text-red-500" : "text-black")}>
                             {row.expKir}
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>

           <div className="mt-6 flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <span>Showing 1-5 of 124 Results</span>
              <div className="flex gap-2">
                 <button className="hover:text-black">Previous</button>
                 <span className="text-black">1</span>
                 <button className="hover:text-black">2</button>
                 <button className="hover:text-black">3</button>
                 <button className="hover:text-black">Next</button>
              </div>
           </div>
        </div>
      </div>

      {/* Row 2 Grid: Driver, Vendor, Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Driver License Risks */}
         <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
               <UserIcon size={16} className="text-brand-light" />
               <h3 className="text-[11px] font-black text-black uppercase tracking-widest">{t.driverLicenseStatus}</h3>
            </div>
            <table className="w-full text-[10px] text-black font-bold text-left border-collapse">
               <thead>
                  <tr className="bg-slate-50 py-2 border-b border-slate-200 uppercase font-black text-slate-500">
                     <th className="px-4 py-2">{t.driverName}</th>
                     <th className="px-4 py-2">{t.simType}</th>
                     <th className="px-4 py-2">Exp. Date</th>
                     <th className="px-4 py-2 text-right">{t.statusLabel}</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {driverData.map((row, i) => (
                    <tr key={i}>
                       <td className="px-4 py-3">{row.name}</td>
                       <td className="px-4 py-3 border-l border-slate-100 uppercase">{row.type}</td>
                       <td className={cn("px-4 py-3 border-l border-slate-100 font-black", row.date === 'Expired' ? "text-red-500" : "text-black")}>{row.date}</td>
                       <td className="px-4 py-3 text-right">
                          <div className={cn("w-2.5 h-2.5 rounded-full ml-auto inline-block", 
                             row.status === 'red' ? "bg-red-500" : row.status === 'yellow' ? "bg-yellow-500" : "bg-green-500"
                          )}/>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>

         {/* Expiration Timeline */}
         <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                 <Calendar size={16} className="text-brand-light" />
                 <h3 className="text-[11px] font-black text-black uppercase tracking-widest">{t.expTimeline}</h3>
              </div>
              <div className="flex items-center gap-4 text-[9px] font-black text-black uppercase">
                 <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-green-500 rounded" /> STNK</div>
                 <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-yellow-400 rounded" /> KIR</div>
              </div>
            </div>
            <div className="h-[200px]">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={timelineData}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#000000' }} />
                     <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#000000' }} />
                     <Tooltip cursor={{ fill: '#f8fafc' }} />
                     <Bar dataKey="stnk" fill="#22c55e" radius={[4, 4, 0, 0]} />
                     <Bar dataKey="kir" fill="#facc15" radius={[4, 4, 0, 0]} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>
      </div>

      {/* Vendor Table */}
      <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
         <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
            <Layers size={16} className="text-brand-light" />
            <h3 className="text-[11px] font-black text-black uppercase tracking-widest">{t.vendorCorpDocs}</h3>
         </div>
         <table className="w-full text-[10px] text-black font-bold border-collapse">
            <thead>
               <tr className="bg-slate-50 border-b border-slate-200 font-black text-slate-500 uppercase tracking-widest">
                  <th className="px-4 py-3">{t.vendorName}</th>
                  <th className="px-4 py-3 border-l border-slate-100">NIB/NPWP</th>
                  <th className="px-4 py-3 border-l border-slate-100">MOU Exp.</th>
                  <th className="px-4 py-3 border-l border-slate-100 text-right">{t.statusLabel}</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-left">
               {[
                 { name: 'PT Trans Logistik', doc: 'Verified', date: 'Jun 2026', status: 'Active', color: 'green' },
                 { name: 'PT Mitra Sejati', doc: 'Verified', date: 'Exp', status: 'Expired', color: 'red' },
                 { name: 'PT Surya Abadi', doc: 'Pending', date: 'Dec 2026', status: 'Pending', color: 'yellow' },
               ].map((row, i) => (
                 <tr key={i}>
                    <td className="px-4 py-3">{row.name}</td>
                    <td className="px-4 py-3 border-l border-slate-100">{row.doc}</td>
                    <td className={cn("px-4 py-3 border-l border-slate-100 font-black", row.date === 'Exp' ? "text-red-500" : "text-black")}>{row.date}</td>
                    <td className="px-4 py-3 border-l border-slate-100 text-right">
                       <span className={cn("px-3 py-1 rounded-full text-[9px] font-black uppercase text-white shadow-sm", 
                          row.color === 'green' ? "bg-green-500" : row.color === 'red' ? "bg-red-500" : "bg-yellow-500"
                       )}>
                          {row.status}
                       </span>
                    </td>
                 </tr>
               ))}
            </tbody>
         </table>
      </div>
    </motion.div>
  );
}

function ManageView({ shipments, t }: { shipments: Shipment[]; t: any; key?: string }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Shipment | null>(null);
  const [dynamicFields, setDynamicFields] = useState<{ key: string, value: string }[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const filtered = shipments.filter(s => 
    s.truckPlate.toLowerCase().includes(search.toLowerCase()) ||
    s.driverName.toLowerCase().includes(search.toLowerCase())
  );

  const startEdit = (shipment: Shipment) => {
    setEditingId(shipment.id);
    setEditData({ ...shipment });
    
    // Extract dynamic fields (everything not core)
    const coreKeys = ['id', 'truckPlate', 'driverName', 'status', 'origin', 'destination', 'timestamp', 'type'];
    const dynamic = Object.entries(shipment)
      .filter(([key]) => !coreKeys.includes(key))
      .map(([key, value]) => ({ key, value: String(value) }));
    setDynamicFields(dynamic);
  };

  const addDynamicField = () => {
    setDynamicFields([...dynamicFields, { key: '', value: '' }]);
  };

  const removeDynamicField = (index: number) => {
    const next = [...dynamicFields];
    next.splice(index, 1);
    setDynamicFields(next);
  };

  const handleUpdate = async () => {
    if (!editData || !editingId) return;
    setLoading(true);
    try {
      const cleanedData: any = {};
      const coreKeys = ['truckPlate', 'driverName', 'status', 'origin', 'destination', 'timestamp', 'type'];
      coreKeys.forEach(key => { 
        if((editData as any)[key]) cleanedData[key] = (editData as any)[key];
      });
      
      dynamicFields.forEach(field => {
        if (field.key.trim()) cleanedData[field.key.trim()] = field.value;
      });

      await updateDoc(doc(db, 'shipments', editingId), cleanedData);
      setEditingId(null);
    } catch (err: any) {
      console.error(err);
      alert(`${t.language === 'Bahasa' ? 'Gagal' : 'Failed'}: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

   const handleDelete = async (id: string) => {
    if (confirm(t.confirmDeleteArmada)) {
      try {
        await deleteDoc(doc(db, 'shipments', id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-black tracking-tight">{t.databaseHub}</h2>
          <p className="text-black text-xs font-bold">{t.editArmada}</p>
        </div>
        <div className="relative group max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-light transition-colors" size={14} />
          <input 
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t.search}
            className="bg-white border border-slate-300 rounded-lg pl-10 pr-4 py-2 text-xs text-black font-black focus:outline-none focus:border-brand-dark transition-all w-full sm:w-64 placeholder:text-slate-500"
          />
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-slate-950 font-black font-sans">{t.manifest}</th>
                <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-slate-950 font-black font-sans">{t.origin}</th>
                <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-slate-950 font-black font-sans">{t.status}</th>
                <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-slate-950 font-black font-sans text-right">{t.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {shipments.map(s => (
                <tr key={s.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-8 py-4">
                    <div className="font-mono text-black text-sm font-black">{s.truckPlate}</div>
                  </td>
                  <td className="px-8 py-4">
                    <div className="text-black text-xs font-bold">{s.origin}</div>
                  </td>
                  <td className="px-8 py-4 text-xs">
                    <span className={cn(
                      "tag py-1 px-3",
                      s.status === 'Delivered' ? "bg-green-100 text-green-600" : 
                      s.status === 'In Transit' ? "bg-blue-100 text-blue-600" : 
                      "bg-slate-100 text-slate-400"
                    )}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <div className="flex gap-2 justify-end">
                      <button 
                        onClick={() => startEdit(s)} 
                        className="btn btn-secondary py-1 px-3 text-[11px] font-bold"
                      >
                        CONFIG
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
        {filtered.length === 0 && (
          <div className="p-20 text-center">
            <Package size={48} className="mx-auto text-slate-800 mb-4" />
            <p className="text-slate-600 font-serif italic italic-small tracking-normal">{t.noActivity}</p>
          </div>
        )}

      {/* Edit Side Modal */}
      <AnimatePresence>
        {editingId && editData && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingId(null)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-xl bg-white border-l border-slate-800 shadow-2xl z-[101] flex flex-col"
            >
              <div className="p-8 border-b border-slate-200 flex items-center justify-between bg-white backdrop-blur-md sticky top-0 z-10">
                <div>
                  <h3 className="text-xl font-black text-black tracking-tight">{t.dynSchema}</h3>
                  <p className="text-xs text-brand-dark font-black mt-1 uppercase tracking-widest">{t.liveUpdate}: {editData.truckPlate}</p>
                </div>
                <button 
                  onClick={() => setEditingId(null)} 
                  className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-10 space-y-12">
                {/* Core Sections */}
                <section className="space-y-6">
                  <div className="section-title">{t.opsContext}</div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="form-group">
                      <label>{t.consignee}</label>
                      <input 
                        value={editData.driverName}
                        onChange={e => setEditData({...editData, driverName: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label>{t.status}</label>
                      <select 
                        value={editData.status}
                        onChange={e => setEditData({...editData, status: e.target.value as any})}
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Transit">In Transit</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="form-group">
                      <label>{t.origin}</label>
                      <input 
                        value={editData.origin}
                        onChange={e => setEditData({...editData, origin: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label>{t.destination}</label>
                      <input 
                        value={editData.destination}
                        onChange={e => setEditData({...editData, destination: e.target.value})}
                      />
                    </div>
                  </div>
                </section>

                {/* Dynamic Data Section */}
                <section className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="section-title">{t.addColumn}</div>
                    <button 
                      onClick={addDynamicField}
                      className="text-[11px] font-bold text-blue-600"
                    >
                      {t.addField}
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {dynamicFields.map((field, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={idx} 
                        className="flex gap-4 items-end bg-slate-50 p-4 rounded border border-slate-800"
                      >
                        <div className="flex-1 form-group mb-0">
                          <label>{t.fieldName}</label>
                          <input 
                            value={field.key}
                            onChange={e => {
                              const next = [...dynamicFields];
                              next[idx].key = e.target.value;
                              setDynamicFields(next);
                            }}
                            placeholder={t.fieldPlaceholder}
                          />
                        </div>
                        <div className="flex-[1.5] form-group mb-0">
                          <label>{t.value}</label>
                          <input 
                            value={field.value}
                            onChange={e => {
                              const next = [...dynamicFields];
                              next[idx].value = e.target.value;
                              setDynamicFields(next);
                            }}
                            placeholder={t.valPlaceholder}
                          />
                        </div>
                        <button 
                          onClick={() => removeDynamicField(idx)}
                          className="p-2 text-slate-400 hover:text-red-500 transition-all rounded mb-0.5"
                        >
                          <Trash2 size={16} />
                        </button>
                      </motion.div>
                    ))}
                    
                    {dynamicFields.length === 0 && (
                      <div className="text-center py-8 bg-slate-50 rounded border border-dashed border-slate-800">
                        <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">
                          {t.noActivity}
                        </p>
                      </div>
                    )}
                  </div>
                </section>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8 pt-0 bg-white/80 backdrop-blur-md">
                  <div className="flex gap-4 pt-4 border-t border-slate-50">
                    <button onClick={() => setEditingId(null)} className="h-12 flex-1 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all">{t.cancel}</button>
                    <button onClick={handleUpdate} className="h-12 flex-[2] bg-primary text-white rounded-xl shadow-lg shadow-primary/20 text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all">{t.save}</button>
                  </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ProfileEdit({ t, user, lang }: { t: any, user: any, lang: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-2xl mx-auto py-8">
      <Card className="bg-white border-none shadow-2xl p-12 rounded-[2rem] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-[0.02]">
          <UserIcon size={240} className="text-primary" />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-8 mb-12">
          <div className="relative group">
            <div className="absolute -inset-4 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-500" />
            <img src={user?.photoURL || ''} alt={user?.displayName || ''} className="w-40 h-40 rounded-full border-8 border-white shadow-2xl relative z-10 transition-transform duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-black text-slate-800 tracking-tight leading-tight">{user?.displayName || (lang === 'id' ? 'Pengguna Tamu' : 'Guest User')}</h1>
            <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">{user?.email || 'guest@pancaran.io'}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-primary/20 transition-all">
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-300 mb-2 group-hover:text-primary transition-colors">Digital Identity</p>
            <div className="flex items-center justify-between">
                <p className="text-lg font-black text-slate-800">{user?.displayName || (lang === 'id' ? 'Pengguna Tamu' : 'Guest User')}</p>
                <div className="p-2 bg-white rounded-lg border border-slate-100 text-slate-400">
                    <UserIcon size={16} />
                </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-primary/20 transition-all">
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-300 mb-2 group-hover:text-primary transition-colors">Verified Channel</p>
            <div className="flex items-center justify-between">
                <p className="text-lg font-black text-slate-800 font-mono">{user?.email || 'guest@pancaran.io'}</p>
                <div className="p-2 bg-white rounded-lg border border-slate-100 text-slate-400">
                    <CheckCircle2 size={16} />
                </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4">
          <div className="h-px w-20 bg-slate-100" />
          <p className="text-[9px] text-slate-300 uppercase tracking-[0.3em] font-black">Secure Pancaran Cloud ID</p>
        </div>
      </Card>
    </motion.div>
  );
}

