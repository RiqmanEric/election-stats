package election.stats;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

public class updateDB {

	public static void main(String args[]) throws SQLException {

		ConnectDB connectDB = new ConnectDB();
		connectDB.createConnection();
		String query = "";
		Statement queryDB = connectDB.conn.createStatement();
		ResultSet rs;

		// Inserting constituency notable persons
		ArrayList<String> personname = new ArrayList<String>();
		ArrayList<String> persondob = new ArrayList<String>();
		ArrayList<String> constituencyname = new ArrayList<String>();
		ArrayList<String> statename = new ArrayList<String>();
		query = "select distinct personname, persondob, constituencyname, statename from candidate where results = 'T'";
		rs = queryDB.executeQuery(query);
		while (rs.next()) {
			personname.add(rs.getString(1));
			persondob.add(rs.getString(2));
			constituencyname.add(rs.getString(3));
			statename.add(rs.getString(4));
		}
		for (int i = 0; i < personname.size(); i++) {
			query = "insert into notablepersonconstituency values ('"
					+ constituencyname.get(i) + "','" + statename.get(i)
					+ "','" + personname.get(i) + "','" + persondob.get(i)
					+ "');";
			queryDB.executeUpdate(query);
		}
		connectDB.closeConnection();

	}
}
