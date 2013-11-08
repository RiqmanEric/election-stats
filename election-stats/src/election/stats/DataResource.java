package election.stats;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Collections;

import javax.servlet.ServletContext;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
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
		
		// Querying Party Info
		String query = "select * from party where name = '" + partyname + "';";		
		Statement queryDB = connectDB.conn.createStatement(); 	
		ResultSet rs = queryDB.executeQuery(query);
		if (!rs.next()) {
			throw new WebApplicationException(404);
		}
		else {			
			//Ideology of the party
			String ideology = rs.getString(2);
			if (ideology == null) toReturn.setIdeology("N/A");
			else toReturn.setIdeology(ideology);
			
			//Chairperson of the party
			String chairpersonname = rs.getString(8);
			String chairpersondob = rs.getString(9);
			if (chairpersonname == null){
				chairpersonname = "N/A";
				chairpersondob = "N/A";
			}
			else if(chairpersondob == null){
				chairpersondob = "N/A";
			}
			toReturn.setChairPerson(new Person(chairpersonname, chairpersondob, "N/A", "N/A", "N/A"));
			
			//History of the party
			String history = rs.getString(3);
			if(history == null){
				history = "N/A";
			}
			toReturn.setHistory(history);
			
			//Image of the party
			String image = rs.getString(6);
			if(image == null){
				image = "0.jpg";
			}
			toReturn.setImage(image);			
		}
		
		//Notable people of the party			
		ArrayList<Person> notablePerson = new ArrayList<Person>();
		query = "select * from NotablePerson where partyname = '" + partyname + "';";
		rs = queryDB.executeQuery(query);
		while (rs.next()) {
			String notablePersonName = rs.getString(2);
			String notablePersonDOB = rs.getString(3);
			if(notablePersonDOB == null){
				notablePersonDOB = "N/A";
			}
			notablePerson.add(new Person(notablePersonName, notablePersonDOB, "N/A", "N/A", "N/A"));			
		}
		toReturn.setNotablePerson(notablePerson);
		
		return toReturn;
	}

	@GET
	@Path("person/{personname}/{personDOB}")
	@Produces(MediaType.APPLICATION_JSON)
	public Person getPerson(@PathParam("personname") String personname, @PathParam("personDOB") String persondob) throws SQLException {
		
		ConnectDB connectDB = (ConnectDB) S.getAttribute("connectDB");
		Person toReturn = new Person(personname, persondob, null, null, null);
		
		// Querying Person Info
		String query = "select * from Person where name = '" + personname + "' and DOB = '" + persondob + "';";
		Statement queryDB = connectDB.conn.createStatement(); 	
		ResultSet rs = queryDB.executeQuery(query);
		if (!rs.next()) {
			throw new WebApplicationException(404);
		}
		else {
			//Photo of the person
			String photo = rs.getString(3);
			if(photo == null) photo = "0.jpg";
			toReturn.setPhoto(photo);
			
			//History of the person
			String history = rs.getString(4);
			if(history == null) history = "N/A";
			toReturn.setHistory(history);
			
			//Sex of the person
			String sex = rs.getString(6);
			if(sex == null) sex = "N/A";
			toReturn.setSex(sex);
		}
		
		return toReturn;
	}
	
	@GET
	@Path("state/{stateName}")
	@Produces(MediaType.APPLICATION_JSON)
	public State getState(@PathParam("stateName") String statename) throws SQLException {
		
		ConnectDB connectDB = (ConnectDB) S.getAttribute("connectDB");
		State toReturn = new State(statename, null);
		
		// Querying State Info
		String query = "select * from State where name = '" + statename + "';";
		Statement queryDB = connectDB.conn.createStatement(); 	
		ResultSet rs = queryDB.executeQuery(query);
		if (!rs.next()) {
			throw new WebApplicationException(404);
		}
		else {
			//Major party of the state
			String majorParty = rs.getString(2);
			if(majorParty == null) majorParty = "N/A";
			toReturn.setMajorParty(majorParty);
		}
		
		return toReturn;
	}
	
	@GET
	@Path("constituency/{stateName}/{constituencyName}")
	@Produces(MediaType.APPLICATION_JSON)
	public Constituency getConstituency(@PathParam("stateName") String statename,@PathParam("constituencyName") String constituencyname ) throws SQLException {
		
		ConnectDB connectDB = (ConnectDB) S.getAttribute("connectDB");
		Constituency toReturn = new Constituency(constituencyname, statename, null, null , null, null);
		
		// Querying State Info
		String query = "select * from Constituency where name = '" + constituencyname + "' and statename = '"+ statename + "';";
		Statement queryDB = connectDB.conn.createStatement(); 	
		ResultSet rs = queryDB.executeQuery(query);
		if (!rs.next()) {
			throw new WebApplicationException(404);
		}
		else {
			//facts of the constituency
			String facts = rs.getString(3);
			if(facts == null) facts = "N/A";
			toReturn.setFacts(facts);
			
			//foundation year of the constituency
			String foundationYear = "N/A";
			System.out.println(rs.getInt(4));
			if(rs.getInt(4) != 0) foundationYear = String.valueOf(rs.getInt(4));
			toReturn.setFoundationYear(foundationYear);
			
			//major party of the constituency
			String majorParty = rs.getString(5);
			if(majorParty == null) majorParty = "N/A";
			toReturn.setMajorParty(majorParty);
		}
		
		//Notable people of the party			
		ArrayList<Person> notablePerson = new ArrayList<Person>();
		query = "select * from NotablePersonConstituency where name = '" + constituencyname + "' and statename = '" + statename + "';";
		rs = queryDB.executeQuery(query);
		while (rs.next()) {
			String notablePersonName = rs.getString(3);
			String notablePersonDOB = rs.getString(4);
			if(notablePersonDOB == null){
				notablePersonDOB = "N/A";
			}
			notablePerson.add(new Person(notablePersonName, notablePersonDOB, "N/A", "N/A", "N/A"));			
		}
		toReturn.setNotablePerson(notablePerson);	
		
		return toReturn;
	}
	
	@GET
	@Path("list/state")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<String> getStateList() throws SQLException {
		
		ConnectDB connectDB = (ConnectDB) S.getAttribute("connectDB");
		ArrayList<String> toReturn = new ArrayList<String>();
		
		// Querying State List
		String query = "select Name from State";
		Statement queryDB = connectDB.conn.createStatement(); 	
		ResultSet rs = queryDB.executeQuery(query);
		while (rs.next()) {
			//name of the state
			String name = rs.getString(1);
			toReturn.add(name);
		}
		
		return toReturn;
	}
	
	@GET
	@Path("list/{stateName}")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<String> getConstituencyList(@PathParam("stateName") String statename) throws SQLException {
		
		ConnectDB connectDB = (ConnectDB) S.getAttribute("connectDB");
		ArrayList<String> toReturn = new ArrayList<String>();
		
		// Querying State List
		String query = "select Name from Constituency where StateName = '" + statename + "';";
		Statement queryDB = connectDB.conn.createStatement(); 	
		ResultSet rs = queryDB.executeQuery(query);
		while (rs.next()) {
			//name of the state
			String name = rs.getString(1);
			toReturn.add(name);
		}
		
		return toReturn;
	}
	
	@GET
	@Path("candidate/")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Candidate> getCandidateList(
			@QueryParam("constituency") String constituencyName,
			@QueryParam("state") String stateName,
			@QueryParam("election") String electionYear,
			@QueryParam("party") String partyName,
			@QueryParam("personname") String personName,
			@QueryParam("persondob") String personDOB) throws SQLException {
		
		ConnectDB connectDB = (ConnectDB) S.getAttribute("connectDB");
		ArrayList<Candidate> toReturn = new ArrayList<Candidate>();
		
		// Querying State List
		String query = "select * from Candidate where candidateID > 0";
		if(constituencyName != ""){
			query = query + " and constituencyName = '" + constituencyName + "'";
		}
		if(stateName != ""){
			query = query + " and stateName = '" + stateName + "'";
		}
		if(electionYear != ""){
			query = query + " and year = " + String.valueOf(electionYear);
		}
		if(partyName != ""){
			query = query + " and partyName = '" + partyName + "'";
		}
		if(personName != ""){
			query = query + " and personName = '" + personName + "'";
		}
		if(personDOB != ""){
			query = query + " and personDOB = '" + personDOB + "'";
		}
		query = query + ";";
		
		Statement queryDB = connectDB.conn.createStatement(); 	
		ResultSet rs = queryDB.executeQuery(query);
		while (rs.next()) {
			Candidate candidate = new Candidate(0, 0, 0, 0, null, null, null, null, null);
			
			//id of the candidate
			int id = rs.getInt(1);
			candidate.setCandidateID(id);
			
			//votes of the candidate
			int votes = rs.getInt(2);			
			candidate.setVotes(votes);
			
			//election year of the candidate
			int year = rs.getInt(3);
			candidate.setYear(year);
			
			//result of the candidate
			boolean res = rs.getBoolean(4);
			String result;
			if(res){
				result = "Won";
			}
			else{
				result = "Lost";
			}
			candidate.setResult(result);
			
			//party of the candidate
			String party = rs.getString(5);
			if(party == null){
				party = "N/A";
			}
			candidate.setParty(party);
			
			//constituency of the candidate
			String constituency = rs.getString(6);
			if(constituency == null){
				constituency = "N/A";
			}
			candidate.setConstituency(constituency);
			
			//State of the candidate
			String state = rs.getString(7);
			if(state == null){
				state = "N/A";
			}
			candidate.setState(state);
			
			//Person information of the candidate
			String personname = rs.getString(8);
			String persondob = rs.getString(9);	
			
			Person person = new Person(personname, persondob, "N/A", "N/A", "N/A");
			candidate.setPerson(person);
						
			toReturn.add(candidate);
		}
		
		for(int i = 0; i < toReturn.size(); i++){
			Person person = toReturn.get(i).getPerson();
			
			//Person info of candidate
			query = "Select * from person where name = '" + person.getName() + "' and DOB = '" + person.getDob() + "';";
			ResultSet rs2 = queryDB.executeQuery(query);
			if(!rs2.next()){
				
			}
			else{
				String Photo = rs2.getString(3);
				if(Photo == null) Photo = "0.jpg";
				person.setPhoto(Photo);
				
				String sex = rs2.getString(6);
				if(sex == null) sex = "N/A";
				person.setSex(sex);
				
				toReturn.get(i).setPerson(person);			
			}
			
			//Percent votes for the candidate
			query = "Select * from stats where electionYear = '" + String.valueOf(toReturn.get(i).getYear()) + "' and constituencyName = '" + toReturn.get(i).getConstituency() + "' and stateName = '" + toReturn.get(i).getState() + "';";
			rs2 = queryDB.executeQuery(query);
			if(!rs2.next()){
				
			}
			else{
				float percentage = 24;
				int totalVotes = rs2.getInt(5);
				if(totalVotes != 0) percentage = (toReturn.get(i).getVotes() * 100)/totalVotes;
				toReturn.get(i).setPercentVotes(percentage);			
			}
		}
		
		return toReturn;
	}
	
	@GET
	@Path("discussion/{index}")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Discussion> getDiscussionList(
			@PathParam("index") String index,
			@QueryParam("constituency") String constituencyName,
			@QueryParam("state") String stateName,
			@QueryParam("election") String electionYear,
			@QueryParam("party") String partyName,
			@QueryParam("personname") String personName,
			@QueryParam("persondob") String personDOB) throws SQLException {
		
		ConnectDB connectDB = (ConnectDB) S.getAttribute("connectDB");
		ArrayList<Discussion> toReturn = new ArrayList<Discussion>();
		ArrayList<Integer> discussionIds = new ArrayList<Integer>();
		
		String query = "";
		Statement queryDB = connectDB.conn.createStatement();
		ResultSet rs;
		
		//Discussions about constituency
		if(constituencyName != "" && stateName != ""){
			query = "select id from constituencyStarter where constituencyname = '" + constituencyName + "' and stateName = '" + stateName + "';";
			rs = queryDB.executeQuery(query);
			while (rs.next()){
				discussionIds.add(rs.getInt(1));
			}
		}
		
		//Discussion about election
		if(electionYear != ""){
			query = "select id from electionStarter where year = " + electionYear + ";";
			rs = queryDB.executeQuery(query);
			while (rs.next()){
				discussionIds.add(rs.getInt(1));
			}
		}
		
		//Discussion about party
		if(partyName != ""){
			query = "select id from partyStarter where partyName = '" + partyName + "';";
			rs = queryDB.executeQuery(query);
			while (rs.next()){
				discussionIds.add(rs.getInt(1));
			}
		}
		
		//Discussion about person
		if(personName != "" && personDOB != ""){
			query = "select id from personStarter where personName = '" + personName + "' and personDOB = '" + personDOB + "';";
			rs = queryDB.executeQuery(query);
			while (rs.next()){
				discussionIds.add(rs.getInt(1));
			}
		}
		
		Collections.sort(discussionIds);
		
		for(int i = discussionIds.size() - 1; i > discussionIds.size() - Integer.parseInt(index) && i >= 0; i--){
			int id = discussionIds.get(i);
			Discussion discussion = new Discussion(id, null, null);
			query = "select * from discussion where id = " + id + ";";
			rs = queryDB.executeQuery(query);
			String emailId = "";
			if(!rs.next()) {
				
			}
			else{
				String content = rs.getString(2);
				discussion.setContent(content);
				
				emailId = rs.getString(3);				
			}
			
			query = "select * from users where emailid = '" + emailId + "';";
			rs = queryDB.executeQuery(query);
			if(!rs.next()) {
				
			}
			else{
				String name = rs.getString(2);
				discussion.setName(name);			
			}
			
			toReturn.add(discussion);
		}
		
		return toReturn;
	}
}
