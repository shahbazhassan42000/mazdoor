import mongoose from "mongoose";

import "../models/user.js";
import "../models/gig.js";
import "../models/project.js";

const User = mongoose.model("users");
const Gig = mongoose.model("gigs");
const Project = mongoose.model("projects");

export default {
    delete(req, res, next) {
        const id = req.params.id;

        if (!id) return res.status(400).json("Invalid data, must provide project ID");

        // validate project ID
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json("Invalid project ID");

        Project.findById(id)
            .then(project => {
                if (!project) return res.status(404).json("Project not found");
                // delete project
                project.remove()
                    .then(() => {
                        // remove project from customer
                        User.findById(project.customer)
                            .then(customer => {
                                if (!customer) return res.status(404).json("Customer not found");
                                customer.projects.pull(project._id);
                                customer.save()
                                    .then(customer => {
                                        // remove project from seller
                                        User.findById(project.seller)
                                            .then(seller => {
                                                if (!seller) return res.status(404).json("Seller not found");
                                                seller.projects.pull(project._id);
                                                seller.save()
                                                    .then(seller => {
                                                        // remove project from gig
                                                        Gig.findById(project.gig)
                                                            .then(gig => {
                                                                if (!gig) return res.status(404).json("Gig not found");
                                                                gig.projects.pull(project._id);
                                                                gig.save()
                                                                    .then(gig => {
                                                                        // Return the project
                                                                        return res.status(204).json(project);
                                                                    }).catch(next);
                                                            }).catch(next);
                                                    }).catch(next);
                                            }).catch(next);
                                    }).catch(next);
                            }).catch(next);
                    }).catch(next);
            }).catch(next);
    }, // end delete
    all(req, res, next) {
        Project.find().populate("gig", "-__v").populate("customer", "-__v -hash -salt -gigs -projects -conversations").populate("seller", "-__v -hash -salt -gigs -projects -conversations")
            .then((projects) => {
                // Return the array of projects
                return res.status(200).json(projects);
            }).catch(next);

    }, // end all
    getByUserId(req, res, next) {
        const id = req.params.id;

        if (!id) return res.status(400).json("Invalid data, must provide user ID");

        // validate user ID
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json("Invalid user ID");

        Project.find({ $or: [{ seller: id }, { customer: id }] }).populate("gig", "title image user").populate("customer", "name username image").populate("seller", "name username image")
            .then((projects) => {
                // Return the array of projects
                return res.status(200).json(projects);
            }).catch(next);
    }, // end getByUserId
    get(req, res, next) {
        const id = req.params.id;

        if (!id) return res.status(400).json("Invalid data, must provide project ID");

        // validate project ID
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json("Invalid project ID");

        Project.findById(id).populate("gig", "title image").populate("customer", "name username image").populate("seller", "name username image")
            .then((project) => {
                if (!project) return res.status(404).json("Project not found");
                // Return the project
                return res.status(200).json(project);
            }).catch(next);
    }, // end get
    update(req, res, next) {
        const id = req.params.id;
        const data = req.body.project;

        if (!id) return res.status(400).json("Invalid data, must provide project ID");

        if (!data) return res.status(400).json("Invalid data, must provide project data");

        // validate project ID
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json("Invalid project ID");

        // validate gig ID
        if (data.gig && !mongoose.Types.ObjectId.isValid(data.gig)) return res.status(400).json("Invalid gig ID");

        // validate customer ID
        if (data.customer && !mongoose.Types.ObjectId.isValid(data.customer)) return res.status(400).json("Invalid customer ID");

        // validate seller ID
        if (data.seller && !mongoose.Types.ObjectId.isValid(data.seller)) return res.status(400).json("Invalid seller ID");

        Project.findById(id)
            .then(project => {
                if (!project) return res.status(404).json("Project not found");
                // update the project
                if (data.gig) project.gig = data.gig;
                if (data.description) project.description = data.description;
                if (data.price) project.price = data.price;
                if (data.deliveryTime) project.deliveryTime = data.deliveryTime;
                if (data.customer) project.customer = data.customer;
                if (data.seller) project.seller = data.seller;
                if (data.status) project.status = data.status;
                project.save()
                    .then(project => {
                        Project.findById(id).populate("gig", "title image").populate("customer", "name username image").populate("seller", "name username image")
                            .then((project) => {
                                //return the project
                                return res.status(200).json(project);
                            }).catch(next);
                    }).catch(next);
            }).catch(next);
    }, // end update
    create(req, res, next) {
        const data = req.body.project;

        if (!data) return res.status(400).json("Invalid data, must provide project data");

        if (!data.gig) return res.status(400).json("Invalid data, must provide gig ID");
        if (!data.description) return res.status(400).json("Invalid data, must provide description");
        if (!data.price) return res.status(400).json("Invalid data, must provide price");
        if (!data.deliveryTime) return res.status(400).json("Invalid data, must provide delivery time");
        if (!data.customer) return res.status(400).json("Invalid data, must provide customer ID");
        if (!data.seller) return res.status(400).json("Invalid data, must provide seller ID");

        // validate gig ID
        if (!mongoose.Types.ObjectId.isValid(data.gig)) return res.status(400).json("Invalid gig ID");

        // validate customer ID
        if (!mongoose.Types.ObjectId.isValid(data.customer)) return res.status(400).json("Invalid customer ID");

        // validate seller ID
        if (!mongoose.Types.ObjectId.isValid(data.seller)) return res.status(400).json("Invalid seller ID");

        // check first if gig exists

        Gig.findById(data.gig)
            .then(gig => {
                if (!gig) return res.status(404).json("Gig not found");
                // check first if customer exists
                User.findById(data.customer)
                    .then(customer => {
                        if (!customer) return res.status(404).json("Customer not found");
                        // check first if seller exists
                        User.findById(data.seller)
                            .then(seller => {
                                if (!seller) return res.status(404).json("Seller not found");
                                // create the project
                                const project = new Project(data);
                                project.save()
                                    .then(project => {
                                        //add project to customer
                                        customer.projects.push(project._id);
                                        customer.save()
                                            .then(customer => {
                                                //add project to seller
                                                seller.projects.push(project._id);
                                                seller.save()
                                                    .then(seller => {
                                                        //add project to gig
                                                        gig.projects.push(project._id);
                                                        gig.save()
                                                            .then(gig => {
                                                                // Return the project
                                                                return res.status(200).json(project);
                                                            }).catch(next);
                                                    }).catch(next);
                                            }).catch(next);
                                    }).catch(next);
                            }).catch(next);
                    }).catch(next);
            }).catch(next);



    } // end create

}