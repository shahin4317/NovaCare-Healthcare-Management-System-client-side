
"use client";

import React, { useState } from "react";
import {
    Star,
    Pencil,
    TrashBin,
    Plus,
    Stethoscope,
    CircleXmark,
} from "@gravity-ui/icons";

const ReviewPage = () => {
    // =========================
    // Static Reviews
    // =========================

    const [reviews, setReviews] = useState([
        {
            id: 1,
            doctorName: "Dr. Jubayda Al",
            rating: 5,
            review:
                "Very professional and caring doctor. The consultation was excellent.",
            date: "Sep 2, 2026",
        },
        {
            id: 2,
            doctorName: "Dr. Sarah Ahmed",
            rating: 4,
            review:
                "The doctor was very helpful and explained everything clearly.",
            date: "Aug 28, 2026",
        },
    ]);

    // =========================
    // Modal
    // =========================

    const [showModal, setShowModal] = useState(false);

    // null = Add Review
    // object = Update Review

    const [editingReview, setEditingReview] = useState(null);

    // =========================
    // Form
    // =========================

    const [formData, setFormData] = useState({
        doctorName: "",
        rating: 0,
        review: "",
    });

    // =========================
    // Open Add Review
    // =========================

    const openAddReview = () => {
        setEditingReview(null);

        setFormData({
            doctorName: "",
            rating: 0,
            review: "",
        });

        setShowModal(true);
    };

    // =========================
    // Open Update Review
    // =========================

    const openUpdateReview = (review) => {
        setEditingReview(review);

        setFormData({
            doctorName: review.doctorName,
            rating: review.rating,
            review: review.review,
        });

        setShowModal(true);
    };

    // =========================
    // Close Modal
    // =========================

    const closeModal = () => {
        setShowModal(false);
        setEditingReview(null);

        setFormData({
            doctorName: "",
            rating: 0,
            review: "",
        });
    };

    // =========================
    // Input Change
    // =========================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // =========================
    // Rating
    // =========================

    const handleRating = (rating) => {
        setFormData((prev) => ({
            ...prev,
            rating,
        }));
    };

    // =========================
    // Submit Review
    // =========================

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.rating === 0) {
            alert("Please select a rating.");
            return;
        }

        // =========================
        // Console only for now
        // =========================

        console.log("========== REVIEW DATA ==========");
        console.log("Doctor:", formData.doctorName);
        console.log("Rating:", formData.rating);
        console.log("Review:", formData.review);
        console.log("=================================");

        // =========================
        // Update Review
        // =========================

        if (editingReview) {
            setReviews((prev) =>
                prev.map((item) =>
                    item.id === editingReview.id
                        ? {
                              ...item,
                              doctorName: formData.doctorName,
                              rating: formData.rating,
                              review: formData.review,
                          }
                        : item
                )
            );
        }

        // =========================
        // Add Review
        // =========================

        else {
            const newReview = {
                id: Date.now(),
                doctorName: formData.doctorName,
                rating: formData.rating,
                review: formData.review,
                date: "Just now",
            };

            setReviews((prev) => [newReview, ...prev]);
        }

        closeModal();
    };

    // =========================
    // Delete Review
    // =========================

    const handleDelete = (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this review?"
        );

        if (!confirmDelete) return;

        console.log("Delete Review ID:", id);

        setReviews((prev) =>
            prev.filter((review) => review.id !== id)
        );
    };

    // =========================
    // Average Rating
    // =========================

    const averageRating =
        reviews.length > 0
            ? (
                  reviews.reduce(
                      (total, review) => total + Number(review.rating),
                      0
                  ) / reviews.length
              ).toFixed(1)
            : "0.0";

    return (
        <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">

            <div className="mx-auto max-w-6xl">

                {/* =========================
                    Header
                ========================= */}

                <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

                    <div>

                        <div className="mb-2 flex items-center gap-2">

                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                                <Stethoscope className="h-4 w-4 text-primary" />
                            </div>

                            <span className="text-sm font-medium text-primary">
                                Patient Reviews
                            </span>

                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                            My Reviews
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Share your experience and manage your doctor reviews.
                        </p>

                    </div>

                    {/* Add Review */}

                    <button
                        onClick={openAddReview}
                        className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:opacity-90"
                    >
                        <Plus className="h-4 w-4" />
                        Add Review
                    </button>

                </div>


                {/* =========================
                    Summary
                ========================= */}

                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

                    {/* Total Reviews */}

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                        <p className="text-sm font-medium text-slate-500">
                            Total Reviews
                        </p>

                        <p className="mt-2 text-3xl font-bold text-slate-900">
                            {reviews.length}
                        </p>

                    </div>


                    {/* Average Rating */}

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                        <p className="text-sm font-medium text-slate-500">
                            Average Rating
                        </p>

                        <div className="mt-2 flex items-center gap-3">

                            <span className="text-3xl font-bold text-slate-900">
                                {averageRating}
                            </span>

                            <div className="flex gap-0.5 text-amber-400">

                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={`h-4 w-4 ${
                                            star <= Math.round(
                                                Number(averageRating)
                                            )
                                                ? "fill-current"
                                                : ""
                                        }`}
                                    />
                                ))}

                            </div>

                        </div>

                    </div>


                    {/* Feedback */}

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                        <p className="text-sm font-medium text-slate-500">
                            Your Feedback
                        </p>

                        <p className="mt-2 text-sm font-semibold text-slate-800">
                            Help others choose the right doctor
                        </p>

                    </div>

                </div>


                {/* =========================
                    Review List
                ========================= */}

                <div className="space-y-4">

                    {reviews.map((item) => (

                        <div
                            key={item.id}
                            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md"
                        >

                            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                                {/* Doctor */}

                                <div className="flex items-center gap-4">

                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                                        <Stethoscope className="h-6 w-6 text-primary" />
                                    </div>

                                    <div>

                                        <p className="text-xs font-medium text-slate-400">
                                            Doctor
                                        </p>

                                        <h2 className="mt-1 text-base font-bold text-slate-900">
                                            {item.doctorName}
                                        </h2>

                                        <div className="mt-1 flex items-center gap-2">

                                            <div className="flex gap-0.5 text-amber-400">

                                                {[1, 2, 3, 4, 5].map(
                                                    (star) => (
                                                        <Star
                                                            key={star}
                                                            className={`h-3.5 w-3.5 ${
                                                                star <=
                                                                item.rating
                                                                    ? "fill-current"
                                                                    : ""
                                                            }`}
                                                        />
                                                    )
                                                )}

                                            </div>

                                            <span className="text-xs font-semibold text-slate-500">
                                                {item.rating}.0
                                            </span>

                                        </div>

                                    </div>

                                </div>


                                {/* Actions */}

                                <div className="flex items-center gap-2">

                                    <button
                                        onClick={() =>
                                            openUpdateReview(item)
                                        }
                                        className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50"
                                    >
                                        <Pencil className="h-3.5 w-3.5" />
                                        Update
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDelete(item.id)
                                        }
                                        className="flex items-center gap-2 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition-colors hover:bg-red-100"
                                    >
                                        <TrashBin className="h-3.5 w-3.5" />
                                        Delete
                                    </button>

                                </div>

                            </div>


                            {/* Review */}

                            <div className="mt-5 rounded-xl bg-slate-50 p-4">

                                <p className="text-sm leading-6 text-slate-600">
                                    "{item.review}"
                                </p>

                                <p className="mt-3 text-xs text-slate-400">
                                    {item.date}
                                </p>

                            </div>

                        </div>

                    ))}

                </div>

            </div>


            {/* =================================================
                Add / Update Review Modal
            ================================================= */}

            {showModal && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

                    <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">

                        {/* Modal Header */}

                        <div className="flex items-start justify-between border-b border-slate-100 p-6">

                            <div>

                                <p className="text-xs font-medium text-primary">
                                    Patient Feedback
                                </p>

                                <h2 className="mt-1 text-xl font-bold text-slate-900">
                                    {editingReview
                                        ? "Update Review"
                                        : "Add Review"}
                                </h2>

                            </div>

                            <button
                                onClick={closeModal}
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200"
                            >
                                <CircleXmark className="h-5 w-5" />
                            </button>

                        </div>


                        {/* Form */}

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5 p-6"
                        >

                            {/* Doctor Name */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Doctor Name
                                </label>

                                <input
                                    type="text"
                                    name="doctorName"
                                    value={formData.doctorName}
                                    onChange={handleChange}
                                    placeholder="Enter doctor name"
                                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                                    required
                                />

                            </div>


                            {/* Rating */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Your Rating
                                </label>

                                <div className="flex items-center gap-2">

                                    {[1, 2, 3, 4, 5].map((star) => (

                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() =>
                                                handleRating(star)
                                            }
                                            className="transition-transform hover:scale-110"
                                        >

                                            <Star
                                                className={`h-8 w-8 ${
                                                    star <= formData.rating
                                                        ? "fill-current text-amber-400"
                                                        : "text-slate-300"
                                                }`}
                                            />

                                        </button>

                                    ))}

                                    {formData.rating > 0 && (
                                        <span className="ml-2 text-sm font-semibold text-slate-600">
                                            {formData.rating}/5
                                        </span>
                                    )}

                                </div>

                            </div>


                            {/* Review */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Your Review
                                </label>

                                <textarea
                                    name="review"
                                    value={formData.review}
                                    onChange={handleChange}
                                    rows={5}
                                    placeholder="Write your experience with this doctor..."
                                    className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                                    required
                                />

                            </div>


                            {/* Buttons */}

                            <div className="flex gap-3 pt-2">

                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="flex-1 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition-all hover:opacity-90"
                                >
                                    {editingReview
                                        ? "Update Review"
                                        : "Submit Review"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>
    );
};

export default ReviewPage;

