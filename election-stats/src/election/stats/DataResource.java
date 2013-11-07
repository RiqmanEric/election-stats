package election.stats;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import javax.servlet.ServletContext;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

@Path("/")
public class DataResource {
	
	@Context
	private ServletContext S;
	
	@GET
	@Path("party/{partyname}")
	@Produces(MediaType.APPLICATION_JSON)
	public Party getParty(@PathParam("partyname") String partyname) throws SQLException {
		
		ConnectDB connectDB = (ConnectDB) S.getAttribute("connectDB");
		Party toReturn = new Party(partyname, null, null, null, null, null);
		
		String query = "select * from party where name = '" + partyname + "';";
		Statement queryDB = connectDB.conn.createStatement(); 	
		ResultSet rs = queryDB.executeQuery(query);
		if (!rs.next()) {
			
		}
		else {
			String ideology = rs.getString(2);
			if (ideology == null) toReturn.setIdeology("");
			else toReturn.setIdeology(ideology);
			
			String chairPerson = 
			toReturn.setChairPerson(new Person("Sonia Gandhi", "1965-5-4"));
			ArrayList<Person> notablePerson = new ArrayList<Person>();
			notablePerson.add(new Person("Sonia Gandhi", "1965-5-4"));
			notablePerson.add(new Person("Rahul Gandhi", "1965-5-4"));
			notablePerson.add(new Person("Manmohan Singh", "1965-5-4"));
			toReturn.setNotablePerson(notablePerson);
			toReturn.setImage("congress-logo.gif");
			toReturn.setHistory("The history of the Indian National Congress falls into two distinct eras: The pre-independence era, when the party was at the forefront of the struggle for independence and was instrumental in the whole of India; The post-independence era, when the party has enjoyed a prominent place in Indian politics, ruling the country for 48 of the 60 years since independence in 1947.");
			
		}
		return toReturn;
		
	}

	// @GET
	// @Path("person/{personname}")
	// @Produces(MediaType.APPLICATION_JSON)
	// public Party getPerson(@PathParam("personname") String personname) {
	// Party toReturn = new Party(partyname, null, null, null, null, null);
	// toReturn.setIdeology("The party has supported and advocated in favour of farmers, laborers, worker's unions (Labour unions), and religious and ethnic minorities; it has also advocated in favour of the regulation of business and finance, and has looked favourably upon the levying of income taxes.");
	// toReturn.setChairPerson(new Person("Sonia Gandhi", "1965-5-4"));
	// ArrayList<Person> notablePerson = new ArrayList<Person>();
	// notablePerson.add(new Person("Sonia Gandhi", "1965-5-4"));
	// notablePerson.add(new Person("Rahul Gandhi", "1965-5-4"));
	// notablePerson.add(new Person("Manmohan Singh", "1965-5-4"));
	// toReturn.setNotablePerson(notablePerson);
	// toReturn.setImage("congress-logo.gif");
	// toReturn.setHistroy("The history of the Indian National Congress falls into two distinct eras: The pre-independence era, when the party was at the forefront of the struggle for independence and was instrumental in the whole of India; The post-independence era, when the party has enjoyed a prominent place in Indian politics, ruling the country for 48 of the 60 years since independence in 1947.");
	// return toReturn;
	// }
}
