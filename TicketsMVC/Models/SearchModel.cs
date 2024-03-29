﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System;

namespace TicketsMVC.Models
{
    public class SearchModel
    {       
        [Required]
        [Display(Name = "Είδος ταξιδιού")]
        public Triptype Triptype { get; set; }

        public List<MultipleDeparture> MultDepList
        {
            get { return _multDepartures; }
            set { _multDepartures = value; }
        }

        private List<MultipleDeparture> _multDepartures = new List<MultipleDeparture>();
        
        public Passengers TotPassengers { get; set; }
        public Vehicles TotVehicles { get; set; }
    }

    public enum Triptype : int { Simple = 0, WithReturn = 1, Multiple = 2 };
    public class MultipleDeparture
    {
        [Required(ErrorMessage = @"Παρακαλώ επιλέξτε λιμάνι αναχώρησης")]
        [Display(Name = "Από")]
        public String FromPort { get; set; }


        [Required(ErrorMessage = @"Παρακαλώ επιλέξτε λιμάνι προορισμού")]
        [Display(Name = "Πρός")]
        public String ToPort { get; set; }

        [Required(ErrorMessage = @"Συμπληρώστε Ημ/νια Αναχώρησης")]
        [Display(Name = "Αναχώρηση")]
        public DateTime DateFrom { get; set; }

        [Required(ErrorMessage = @"Συμπληρώστε Ημ/νια Επιστροφής")]
        [Display(Name = "Επιστροφή")]
        public DateTime DateTo { get; set; }

        public string[] AlternativePorts { get; set; }
    }

    public class Passengers
    {
        [Required(ErrorMessage = @"Συμπληρώστε αριθμό επιβατών")]
        [Display(Name = "Επιβάτες")]
        [Range(1, 15, ErrorMessage = "Ο επιτρεπτός αριθμός επιβατών είναι από 1 εώς και 15")]
        public int NumOfPassengers { get; set; }

        [Display(Name = "Ενήλικες")]
        public int NumOfAdults { get; set; }

        [Display(Name = "Έφηβοι")]
        public int NumOfTeens { get; set; }

        [Display(Name = "Παιδιά")]
        public int NumOfKids { get; set; }

        [Display(Name = "Βρέφη")]
        public int NumOfInfants { get; set; }

        [Display(Name = "Ηλικιωμένοι")]
        public int NumOfOlders { get; set; }
    }

    public class Vehicles
    {
        [Required(ErrorMessage = @"Συμπληρώστε αριθμό οχημάτων")]
        [Display(Name = "Οχήματα")]
        [Range(0, 8, ErrorMessage = "Ο μέγιστος αριθμός οχημάτων είναι 8")]
        public int NumOfVehicles { get; set; }

        [Display(Name = "Αυτοκίνητα")]
        public int NumOfCars { get; set; }

        [Display(Name = "Μηχανές")]
        public int NumOfMotos { get; set; }

        [Display(Name = "Τρέιλερ")]
        public int NumOfTrailers { get; set; }

        [Display(Name = "Μίνι λεωφορεία")]
        public int NumOfMiniBuses { get; set; }

        [Display(Name = "Φορτηγά")]
        public int NumOfTrucks { get; set; }
    }

}