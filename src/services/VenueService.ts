import Api from './Api'

export default {
    getVenues() {
        return Api().get('venue')
    },
    deleteVenue(venueid: number) {
        return Api().post('venue/delete', {
            id: venueid
        })
    },
    addVenue(newvenue: any) {
        console.log(newvenue);
        return Api().post('venue/add', {
            LocationName: newvenue.LocationName,
            Address: newvenue.Address,
            Capacity: newvenue.Capacity,
            venueType: newvenue.VenueType,
            Price: newvenue.Price
        })
    },
    updateVenue(venue: any) {
        console.log(venue);
        return Api().post('venue/update', {
            id: venue.VenueID,
            LocationName: venue.LocationName,
            Address: venue.Address,
            Capacity: venue.Capacity,
            venueType: venue.VenueType,
            Price: venue.Price
        })
    }
}
