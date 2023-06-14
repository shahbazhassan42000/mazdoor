import mongoose from "mongoose";

import "../models/user.js";
import "../models/gig.js";
import "../models/project.js";

const User = mongoose.model("users");
const Gig = mongoose.model("gigs");
const Project = mongoose.model("projects");

export default {
    all(req, res, next) {
        Project.find().populate("gig", "-__v").populate("customer", "-__v").populate("seller", "-__v")
            .then((projects) => {
                // Return the array of projects
                return res.status(200).json(projects);
            }).catch(next);

    }, // end all
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